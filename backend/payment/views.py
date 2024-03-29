from django.conf import settings
import braintree
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Customer, Address, PaymentMethod, Order

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

        except Exception as e:
            return Response(
                {'error': 'Something went wrong when retrieving Braintree token'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ProcessPaymentView(APIView):
    def post(self, request):
        try:
            data = request.data
            first_name = data['first_name']
            email = str(data['email'])
            email = email.lower()
            street_address = data['street_address']
            city = data['city']
            country = data['country']
            state_province = data['state_province']
            postal_zip_code = data['postal_zip_code']
            nonce = data['nonce']

            if country == 'argentina':
                country_name = 'Argentina'
                country_code = 'AR'
            elif country == 'peru':
                country_name = 'Peru'
                country_code = 'PE'
            elif country == 'chile':
                country_name = 'Chile'
                country_code = 'CL'
            elif country == 'brazil':
                country_name = 'Brazil'
                country_code = 'BR'
            elif country == 'uruguay':
                country_name = 'Uruguay'
                country_code = 'UY'
            
            total_amount = '10.00'

            if Customer.objects.filter(email=email).exists():

                customer = Customer.objects.get(email=email)
                customer_id = str(customer.customer_id)
                
                try:
                    gateway.customer.find(customer_id)
                except:
                    # Create existing Customer in DB, as customer in BT
                    result = gateway.customer.create({
                        'first_name': first_name,
                        'email': email
                    })

                    if result.is_success:
                        customer_id = str(result.customer.id)
                        Customer.objects.filter(email=email).update(customer_id=customer_id)
                        customer = Customer.objects.get(email=email)
                    else:
                        return Response(
                            {'error' : 'Customer information invalid'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
            else:
                # Create Customer if not already in DB
                result = gateway.customer.create({
                    'first_name': first_name,
                    'email': email
                })

                if result.is_success:
                    customer_id = str(result.customer.id)
                    customer = Customer.objects.create(
                        first_name = first_name,
                        email = email,
                        customer_id = customer_id
                    )
                else:

                    return Response(
                        {'error': 'Failed to create customer'},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            if Address.objects.filter(
                customer = customer,
                street_address = street_address,
                city= city,
                country = country_name,
                state_province = state_province,
                postal_zip_code = postal_zip_code
            ).exists():
                address = Address.objects.get(
                    customer = customer,
                    street_address = street_address,
                    city= city,
                    country = country_name,
                    state_province = state_province,
                    postal_zip_code = postal_zip_code
                )

                address_id = address.address_id

                try:
                    result = gateway.address.find(customer_id, address_id)
                except:
                    # Create existing Address in DB, as address in BT
                    result = gateway.address.create({
                        'customer_id' : customer_id,
                        'first_name' : first_name,
                        'street_address' : street_address,
                        'locality' : city,
                        'region': state_province,
                        'postal_code' : postal_zip_code,
                        'country_name' : country_name,
                        'country_code_alpha2': country_code
                    })
                    
                    if result.is_success:
                        address_id = str(result.address.id)
                        
                        Address.objects.filter(
                            customer = customer,
                            street_address = street_address,
                            city= city,
                            country = country_name,
                            state_province = state_province,
                            postal_zip_code = postal_zip_code
                        ).update(address_id=address_id)
                    else:
                        return Response(
                            {'error': 'Invalid address'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
            else:
                # Create Address if not already in DB
                result = gateway.address.create({
                    'customer_id' : customer_id,
                    'first_name' : first_name,
                    'street_address' : street_address,
                    'locality' : city,
                    'region': state_province,
                    'postal_code' : postal_zip_code,
                    'country_name' : country_name,
                    'country_code_alpha2': country_code   
                })

                if result.is_success:
                    address_id = str(result.address.id)
                    Address.objects.create(
                        customer = customer,
                        address_id = address_id,
                        street_address = street_address,
                        city = city,
                        country = country_name,
                        state_province = state_province,
                        postal_zip_code = postal_zip_code
                    )
                    
                    address = Address.objects.get(
                        customer = customer,
                        address_id = address_id,
                        street_address = street_address,
                        city = city,
                        country = country_name,
                        state_province = state_province,
                        postal_zip_code = postal_zip_code
                    )
                else:
                    return Response(
                        {'error': 'Failed to create address'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            # Create Payment Method
            result = gateway.payment_method.create({
                'customer_id' : str(customer_id),
                'billing_address_id' : address_id,
                'payment_method_nonce' : nonce
            })
            
            if result.is_success:
                token = str(result.payment_method.token)
                PaymentMethod.objects.create(
                    customer=customer,
                    billing_address = address,
                    token = token
                )

                payment_method = PaymentMethod.objects.get(
                    customer=customer,
                    billing_address = address,
                    token = token
                )

            else:
                return Response(
                    {'error':'Failed to create payment method in Braintree'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Create transaction
            result = gateway.transaction.sale({
                'merchant_account_id' : settings.BT_MERCHANT_ACCOUNT_ID, # I estimate it will work. If not, put it manually
                'customer_id' : str(customer_id),
                'amount' : total_amount,
                'payment_method_token' : token,
                'billing_address_id': address_id,
                'shipping_address_id': address_id,
                'options' : {
                    'submit_for_settlement' : True
                } 
             })
            
            if result.is_success:
                transaction_id = str(result.transaction.id) 

                Order.objects.create(
                    transaction_id = transaction_id,
                    customer = customer,
                    address = address,
                    payment_method = payment_method
                )
                
                return Response(
                {'success': 'Transaction successful'},
                status=status.HTTP_201_CREATED
            )
            else:
                return Response(
                {'error': 'Failed to process transaction'},
                status=status.HTTP_400_BAD_REQUEST
            )

        except:
            return Response(
                {'error': 'Something went wrong when processing your payment'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )