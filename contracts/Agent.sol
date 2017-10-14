pragma solidity ^0.4.0;

 contract Agent {

event NewAgent(address _startUp, uint _mark, uint _price);
event depositSuccess(address _investor, uint _balance, uint _byTtimestamp);
event TransferSuccess(address _startUp, address _investor, uint _amt);
event Cancel(address _startUp, address _investor);


        modifier onlyOwner(address access) {
         if (access != startUp || access != investor) {
            //throw;
            revert();
         }
         _;
     }

     address public startUp;
     address public investor;
     uint price;
     uint mark = 0;
     uint balance = 0;
     uint currentMileStone;
     uint counter = 0;

        struct mileStone  {
         uint profit;
         uint amt;
         bool free;
         uint timeStamp;
}
    mapping(uint => mileStone) mileStones;

         function Agent(uint _price) {
           //msg.sender
           startUp = msg.sender;
           price = _price;
           NewAgent(startUp, mark, price);
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

     function stringToUint(string s) constant returns (uint result) {
        bytes memory b = bytes(s);
        uint i;
        result = 0;
        for (i = 0; i < b.length; i++) {
            uint c = uint(b[i]);
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
     }

      function deposit(uint byTimestamp) payable {
       require((msg.value == price) && (balance == 0));
                balance = msg.value;
                depositSuccess(investor, balance, byTimestamp);
    }

   function transfer(uint _timestamp){
        if (mark > mileStones[currentMileStone].profit && _timestamp >= mileStones[currentMileStone].timeStamp){
    bool success = msg.sender.send(mileStones[currentMileStone].amt);
        }
        if (success){
            TransferSuccess(startUp, investor, mileStones[currentMileStone].amt);
            currentMileStone++;
        }
        else{
            //expire?
        }
    }

   function expire(uint _timestamp){
        if (_timestamp >= mileStones[currentMileStone].timeStamp){
           msg.sender.transfer(balance);
        }
    }


    // view info functions
     function viewInfo() constant returns (address) {
         return (investor);
     }

  }
