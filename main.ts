controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    height.Jump(mySprite, myHitbox, 23, 1)
})
let mySprite: Sprite = null
let myHitbox: Sprite = null
tiles.setCurrentTilemap(tilemap`level1`)
myHitbox = sprites.create(img`
    . . . . . . f f f f . . . . . . 
    . . . . . . f f f f f . . . . . 
    . . . . . . f f f f f f . . . . 
    . . . . . f f f f f f f f . . . 
    . . . . f f f f f f f f f f . . 
    . . . . f f f f f f f f f f f . 
    . . . f f f f f f f f f f f f f 
    . . . f f f f f f f f f f f f f 
    . . f f f f f f f f f f f f f f 
    . . f f f f f f f f f f f f f f 
    . f f f f f f f f f f f f f f f 
    . f f f f f f f f f f f f f f . 
    f f f f f f f f f f f f f . . . 
    f f f f f f f f f f f . . . . . 
    f f f f f f f . . . . . . . . . 
    f f f f . . . . . . . . . . . . 
    `, SpriteKind.Food)
mySprite = sprites.create(img`
    . . . . . . b b b b . . . . . . 
    . . . . . . b 4 4 4 b . . . . . 
    . . . . . . b b 4 4 4 b . . . . 
    . . . . . b 4 b b b 4 4 b . . . 
    . . . . b d 5 5 5 4 b 4 4 b . . 
    . . . . b 3 2 3 5 5 4 e 4 4 b . 
    . . . b d 2 2 2 5 7 5 4 e 4 4 e 
    . . . b 5 3 2 3 5 5 5 5 e e e e 
    . . b d 7 5 5 5 3 2 3 5 5 e e e 
    . . b 5 5 5 5 5 2 2 2 5 5 d e e 
    . b 3 2 3 5 7 5 3 2 3 5 d d e 4 
    . b 2 2 2 5 5 5 5 5 5 d d e 4 . 
    b d 3 2 d 5 5 5 d d d 4 4 . . . 
    b 5 5 5 5 d d 4 4 4 4 . . . . . 
    4 d d d 4 4 4 . . . . . . . . . 
    4 4 4 4 . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(myHitbox, 65, 65)
scene.cameraFollowSprite(myHitbox)
game.onUpdate(function () {
    height.listenForJump(myHitbox, mySprite)
})
forever(function () {
    info.setScore(height.returnzlayer())
    info.player2.setScore(height.returnaz())
    height.mainLoop2layer(
    myHitbox,
    tiles.getTilesByType(sprites.castle.tileDarkGrass3),
    sprites.castle.tileDarkGrass3,
    sprites.castle.tileGrass2,
    tiles.getTilesByType(sprites.builtin.forestTiles0),
    sprites.builtin.forestTiles0
    )
})
