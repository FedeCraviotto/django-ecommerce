from django.conf import settings
import braintree
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

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