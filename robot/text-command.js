 module.exports = function(jack) {
   return {
        "#turn_left": function(){
             jack.body.foot.turnLeft();
             after(0.9, jack.stop);
        },

        "#turn_right": function(){
             jack.body.foot.turnRight();
             after(0.9, jack.stop);
        },

        "#go_forward" : function(){
             jack.body.foot.turnRight();
             after(2, jack.stop);
        },

        "#go_backward" : function(){
             jack.body.foot.turnRight();
             after(2, jack.stop);
        },

        "#say_hello" : function(){
             jack.body.foot.turnRight();
             after(2, jack.stop);
        },

   };
 };
