## Cards
# To create cards for user we have to use some thing called the pre-Authorized debit. Which allows
# them to sign a transaction that allows us to debit them at particular limit every day. We will use
# the recurring debit program for this. This is the flow
- user creates a card
- when creating the card they have to do 3 things
- register to create a card with national credentials
- they have to set a spending limit...this will aloows us debit from their token account

- create a tx flow that allows users
  -- spend from card
  -- pause card
  -- delete card

  --Big codex will be doing 3 things
   -- create card api
   -- load card
   -- unload card
   -- get card balance

  - to spend from card
    -- debit from card webhook event is emitted.
    -- delegate transfers money from account balance to treasury
  
  - fund account (depositing nomad)
    -- retrieve spending limit balance
    -- if current spending limit is higher than new balance...load users nomad balance equivalent on card
    -- if new balance is higher that spending limit...load the equivalent of the spending limit on the card

  - withdrawing from account ( withdraw from nomad )
   --- check if new balance is less than spending limit...if not do nothing
    -- if lower than spending limit, compare card balance with new balance
      -- if card balance is lesser than new nomad balance, load card the difference between the two
      -- if card balance is higher than new balance, unload card the difference

  - daily limit card.
   -- load the equivalent amount of spending to the card every day
     -- daily cron...check the user nomad balance and the spending limit.
       -- If balance is less spending limit-- refil card card based on the customer nomad balance
       -- If balance is higher or equal to spending limit refil card according to spending limit

  -- freeze card
   -- pause delegate
  