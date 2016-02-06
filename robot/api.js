 module.exports= function(jack){
    return {
        runForward: function(duration) {
            console.log("Get command by API to run runForward");
            jack.body.foot.runForward();
            after((duration).second(), jack.stop);
        },
        runBackward: function() {
            jack.body.foot.runBackward();
            after((0.5).second(), jack.stop);
        },
        turnLeft: function() {
            jack.body.foot.turnLeft();
            after((0.3).second(), jack.stop);

        },
        turnRight: function() {
            jack.body.foot.turnRight();
            after((0.3).second(), jack.stop);
        },
        stop: function() {
            jack.body.foot.stop();
        }
    };
}; 