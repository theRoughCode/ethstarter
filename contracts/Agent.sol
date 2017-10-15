pragma solidity ^0.4.0;

  contract Agent {

event NewAgent(address _startUp, uint _price);
event depositSuccess(address _investor, uint _balance, uint _byTtimestamp);
event TransferSuccess(address _startUp, address _investor, uint _amt);
event ExpireSuccess(address _startUp, address _investor, uint _amt);
event payOutSuccess(address _startUp, address _investor,uint _timestamp,uint thisMonthsSales);
event buyOutSuccess(address _startUp, address _investor, address _newInvestor, uint _timestamp, uint _balance, uint _buyOut);

         modifier onlyOwner(address access) {
         require(access == startUp || access == investor);
         _;
     }

     modifier onlyInvestor(address access){
         require(access == investor);
         _;
     }

     modifier onlyStartUp(address access){
         require(access == startUp);
         _;
     }

     address public startUp;
     address public investor;

     // price of the contract
     uint price;

     //startUp sum mark THIS NEEDS TO BE SET TO 0
     uint mark = 0;
     // contract "escrero" balance
     uint balance = 0;

     uint currentMileStone;
     // tot num of milestone structs
     uint counter = 0;

     //BUY OUT
     uint buyOut;

     uint distribute;


     // Vars to pay investor their royalty
     uint thisMonthsSales;
     uint royalty;


         struct mileStone  {
         uint profit;
         uint amt;
         uint timeStamp;

}
    mapping(uint => mileStone) mileStones;

         function Agent(uint _price, uint _royalty) {
         startUp = msg.sender;
         price = _price;
         royalty = _royalty;
         NewAgent(startUp, price);
         currentMileStone = 0;
         }

     function addMileStone(uint _profit, uint _amt, uint _timestamp){
         mileStone memory newMileStone;
        newMileStone.profit = _profit;
        newMileStone.amt = _amt;
        newMileStone.timeStamp = _timestamp;
        mileStones[counter] = newMileStone;
        counter++;
     }
      function deposit(uint byTimestamp) payable {
        require((msg.value == price) && (balance == 0));
                balance = msg.value;
                investor = msg.sender;
                depositSuccess(investor, balance, byTimestamp);
    }

    function transfer(uint _timestamp) payable {
        require((msg.sender == startUp) && (mark > mileStones[currentMileStone].profit) && (_timestamp >= mileStones[currentMileStone].timeStamp));
  TransferSuccess(startUp, investor, mileStones[currentMileStone].amt);
    msg.sender.transfer(mileStones[currentMileStone].amt);
            currentMileStone++;
    }

    function expire(uint _timestamp) payable{
        require((msg.sender == investor) && (_timestamp >= mileStones[currentMileStone].timeStamp));
        ExpireSuccess(startUp, investor, mileStones[currentMileStone].amt);
        msg.sender.transfer(balance);
        delete investor;
        }

    function stopReturns(uint _timestamp) payable{
        if (_timestamp > mileStones[counter].timeStamp || counter == currentMileStone){
            msg.sender.transfer(balance);
            delete investor;
        }
    }

    //decided investor can set the buy out -> conditions?
    function payOut(uint _timestamp, uint _thisMonthsSales ) payable{
        thisMonthsSales = _thisMonthsSales;
        require((msg.sender == investor));
        msg.sender.transfer(royalty * thisMonthsSales);
        payOutSuccess(startUp, investor, _timestamp, thisMonthsSales);
        mark = mark + thisMonthsSales;
        thisMonthsSales = 0;
    }

    // buy out -> change ownership (IF IT IS THE STARTUP)
    function buyOutFunction(uint timestamp, address newInvestor) payable{
      require((msg.sender == investor) && (balance == buyOut + balance));
      distribute = msg.value;
      investor.transfer(balance + buyOut/2);
      startUp.transfer(buyOut/2);
       buyOutSuccess(startUp, investor, newInvestor, timestamp, balance, buyOut);
      investor = newInvestor;
    }



    // Reputation System





     // view info functions
     function getBalance() constant returns (uint) {
         return balance;
     }

     function getBuyout() constant returns (uint) {
         return (buyOut);
     }

     function getExpiryTime() constant returns (uint) {
         return (mileStones[currentMileStone].timeStamp);
     }

     function getthisMonthsSales() constant returns (uint) {
         return (thisMonthsSales);
     }


  }
