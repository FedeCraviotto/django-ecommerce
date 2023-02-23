Download, create environment 
(WINDOWS USERS : globally install virtualenv)

Install requirements: -Create virtual enviroment (with virtualenv): virtualenv venv
Activate it: source venv/Scripts/activate
Select you Python interpreter. If it's not listed, look for it into your venv/Scripts/python.exe
Then standing on the same folder of the requirements.txt with the terminal: pip install -r requirements.txt

Braintree Sandbox and Paypal Developer:
You may have to create and select a different account as 'default'. Then, pass that account as MERCHANT_ID in the payment views.
You may also have to create another 2 extra accounts: 1 Business Account, and 1 Personal. Both from the same country as your Paypal account (otherwise it wont work)

Don't forget to read the docs and be patient, because any integration is hard to carry on

////

Warning (at February 23th 2023). At the moment of testing payment methods on Brantree SANDBOX ( !== Braintree  )

Test Credit Card Numbers	
You can use the following fictitious credit card numbers when testing your checkout:	
Visa: 4111 1111 1111 1111	
Mastercard: 5555 5555 5555 4444	
Amex: 3714 496353 9843	
You can use any CVC code.	
For expiry dates, use a valid month and a day within the next 180 years. 22/2222 does not work!	
Amounts between $0.01 - $1999.99 simulate a successful authorization.	
Finally, remember to take your account out of test mode when you are finished!
////

Possible errors (backend/frontend):
Check field names
Check allowed country names/codes. I.e. 'Brazil' 'BR' === OK   // 'Brasil' === WRONG (and you may waste a whole hour trying to find the error, lime me >.<  )
Beware typing 'custom' instead of 'customer'

////

Testing Paypal. 

Go to developer.paypal ( !== Paypal | Paypal Business  )
Testing Tools > Accounts > view/edit > Funding > And take the credit card number that shows there



/// NEXT.JS Environment variables

- creat an '.env.local' and set your environment variables. Name it as you prefer.
- No need to 'REACT_APP' or 'NEXT_PUBLIC'...
- Then, include then in the next next.config.js file:

const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  reactStrictMode: true,
}
module.exports = nextConfig

- use them as process.env.YOUR_VARIABLE
- Don't need to install dotenv, nor importing / initializing nothing