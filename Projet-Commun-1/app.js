var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    dom: {
        createContainer: true
    },
    scene: {
        preload: preload,
        create: create
    }
};

var element;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.html('nameform', 'assets/text/loginform.html');
    this.load.image('pic', 'assets/pics/background.jpg');
}

function create ()
{
    this.add.image(400, 300, 'pic');

    var text = this.add.text(10, 10, 'Please chose your name to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

    var element = this.add.dom(400, 600).createFromCache('nameform');

    element.setPerspective(800);

    element.addListener('click');

    element.on('click', function (event) {

        if (event.target.name === 'loginButton')
        {
            var inputUsername = this.getChildByName('username');

            if (inputUsername.value !== '')
            {
                this.removeListener('click');

                this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

                this.scene.tweens.add({ targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
                    onComplete: function ()
                    {
                        element.setVisible(false);
                    }
                });

                text.setText('Welcome ' + inputUsername.value);
            }
            else
            {
                this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
            }
        }

    });
 
    this.tweens.add({
        targets: element,
        y: 300,
        duration: 3000,
        ease: 'Power3'
    });
}
