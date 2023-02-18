from django.conf import settings
import braintree
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Customer

#Con esto seteado podemos crear customers, addresses, paymentMethods
gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id=settings.BT_MERCHANT_ID,
        public_key=settings.BT_PUBLIC_KEY,
        private_key=settings.BT_PRIVATE_KEY
    )
)

class GenerateTokenView(APIView):
    def get(self, request, format=None):
        try:
            client_token = gateway.client_token.generate({
                'merchant_account_id': 'whatever'
            })
            return Response(
                {'token': client_token},
                status=status.HTTP_200_OK
            )
        # We can use only 'exception' but we add the Type so as we can name an alias and then print the error.
        except Exception as e:
            print(e)
            return Response(
                {'error': 'Something went wrong when retrieving Braintree token'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        # If credentials are OK, try login into braintree> Business: You can see your Merchant Account Id (!= from Merchant ID)
        # So you can pass it as value like this (line 20): .generate({'merchant_account_id': <MAccID>})


# Los customers se van a guardar en la Sandbox de BraintreeGateway, entrando a Vault. 
class ProcessPaymentView(APIView):
    def post(self, request):
        try:
            # Del form que enviamos, viene en json
            # Recibimos la data
            data = request.data
            first_name = data['first_name']
            email = str(data['email'])
            email = email.lower()
            street_address = data['street_address']
            city = data['city']
            country = data['country']
            state_province = data['state_province']
            postal_zip_code = data['postal_zip_code']
            #nonce token
            nonce = data['nonce']
            
            # Modelamos el country
            if country == 'argentina':
                country_name = 'Argentina'
                country_code = 'AR'
            elif country == 'peru':
                country_name = 'Peru'
                country_code = 'PE'
            elif country == 'chile':
                country_name = 'Chile'
                country_code = 'CL'
            elif country == 'brasil':
                country_name = 'Brasil'
                country_code = 'BR'
            elif country == 'uruguay':
                country_name = 'Uruguay'
                country_code = 'UY'
            
            total_amount = '10.00'
            
            # Revisamos si el usuario existe en nuestra DB
            if Customer.objects.filter(email=email).exists():
                # Si existe, lo traemos y guardamos su ID
                customer = Customer.objects.get(email=email)
                customer_id = str(customer.customer_id)
                
                # Despues revisamos si ese usuario existe en Braintree. Para eso usamos su ID
                try:
                    # Si todo va bien, no da error. Si da error, cae en el except
                    gateway.customer.find(customer_id)
                except:
                    # Como el usuario no existe en Braintree, entonces lo creamos en Braintree.
                    # Lo que puede pasr tambien es que nuestro cliente exista en nuestra DB, pero haya borrado su cuenta de Braintree
                    result = gateway.customer.create({
                        'first_name': first_name,
                        'email': email
                    })
                    # Lo que devuelve Braintree viene con la propiedad is_success (booleano)
                    if result.is_success:
                        # Si todo sale bien, capturamos el id que viene en la respuesta de braintree, y hacemos el update del usuario en nuestra DB. Actualizamos su ID.
                        customer_id = str(result.customer.id)
                        Customer.objects.filter(email=email).update(customer_id=customer_id)
                        customer = Customer.objects.get(email=email)
                    else:
                        # Si por X motivo la API no funciona...
                        return Response(
                            {'error' : 'Customer information invalid'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
            else:
                # Si el usuario no existe en nuestra DB, lo creamos.
                # Primero en Braintree, para que nos devuelva el ID
                # Y porque vale mas la pena si al mismo tiempo esta en Briantree y en la DB
                result = gateway.customer.create({
                    'first_name': first_name,
                    'email': email
                })
                # Si se crea en Braintree, tomamos el id y creamos el usuario en la DB
                if result.is_success:
                    customer_id = str(result.customer.id)
                    customer = Customer.objects.create(
                        first_name = first_name,
                        email = email,
                        customer_id = customer_id
                    )
                else:
                    # Si por X motivo falla (Braintree o DB)...
                    return Response(
                        {'error': 'Failed to create customer'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            # Una vez que dio todo bien, que el usuario existe tanto en nuestra DB y como en Braintree
            # o en su defecto fue creado satisfactoriamente en una o en ambas, respondemos con un 201.
            # Recordar que el payment se guarda en Braintree
            return Response(
                {'success': 'Created customer successfully'},
                status=status.HTTP_201_CREATED
            )
        except:
            # Si no se pudo por X motivo, se arroja la excepcion
            return Response(
                {'error': 'Something went wrong when processing your payment'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )