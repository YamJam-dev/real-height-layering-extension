let zlayer = 0
let az = 0
let jumping = false
let fallingIndex = 0
let location = tiles.getTileLocation(0, 0)
//% weight=100 color=#000080
namespace height {
    /**
     * Return the frame's current zlayer of the player sprite.
     */
    //% block
    export function returnzlayer() {
        return zlayer
    }

    /**
     * Return the frame's current z movement of the player
     */
    //% block
    export function returnaz() {
        return az
    }

    /**
     * Make a sprite jump 
     * @param sprite sprite to make jump 
     * @param hitbox the player hitbox
     * @param height height to make sprite jump 
     * @param extra extra height sprite gains at the peak of the jump
     */
    //% block="make $sprite jump from $hitbox ||$height pixels with |$extra float pixels"
    //% expandableArgumentMode="toggle"
    //% inlineInputMode="inline"
    //% sprite.defl="mySprite"
    //% sprite.shadow=variables_get
    //% hitbox.defl="myHitbox"
    //% hitbox.shadow="variables_get"
    //% height.defl=23
    //% extra.defl=1
    export function Jump(sprite: Sprite, hitbox: Sprite, height?: number, extra?: number) {
        jumping = true
        //hitbox.setFlag(SpriteFlag.Ghost, false)
        
        fallingIndex = height || 23
        for (let index = 0; index <= height - 1; index++) {
            az += 1
            pause(index)
        }
        az += extra || 1
        pause(30)
        az += extra || 1
        pause(40)
        az += extra * - 1 || -1
        pause(50)
        az += extra * -1 || -1
        pause(40)
        for (let index = 0; index < height; index++) {
            fallingIndex += -1
            az += -1
            pause(fallingIndex)
        }
        jumping = false
        //hitbox.setFlag(SpriteFlag.Ghost, true)
    }
    /**
     * Check for layer collisions on the current frame
     * @param hitbox the player hitbox to detect collisions on
     * @param layer1tile the tile to let the player hitbox move on
     * @param layer1 the tiles to detect as "layer 1". This should be the same as the previous parameter
     * @param layer2tile the tile to let the player hitbox move on in "layer 2"
     * @param layer2 the tiles to detect as "layer 2". This should be the same as the previous parameter
     * @param groundTile the tiles to detect as the ground
     */
    //% block="Run layer detections on $hitbox with $layer1tile for layer 1 $layer1 and $layer2tile for layer 2 $layer2 and $groundTile as ground"
    //% hitbox.defl="myHitbox"
    //% hitbox.shadow=variables_get
    //% layer1.shadow=lists_create_with
    //% layer2.shadow=lists_create_with
    //% layer1tile.shadow=tileset_tile_picker
    //% layer2tile.shadow=tileset_tile_picker
    //% groundTile.shadow=tileset_tile_picker
    export function mainLoop2layer(hitbox: Sprite, layer1: tiles.Location[], layer1tile: Image, groundTile: Image, layer2: tiles.Location[], layer2tile: Image) {
        let location = tiles.getTileLocation(hitbox.tilemapLocation().column, hitbox.tilemapLocation().row)
        if (tiles.tileAtLocationEquals(location, layer1tile)) {
            zlayer = 1
            if (!(jumping)) {
                for (let value6 of layer2) {
                    tiles.setWallAt(value6, true)
                }
            } else if (jumping) {
                for (let value of layer2) {
                    tiles.setWallAt(value, false)
                }
            }
            
            for (let value22 of layer1) {
                tiles.setWallAt(value22, false)
            }
        } else if (tiles.tileAtLocationEquals(location, groundTile)) {
            for (let value of layer1) {
                tiles.setWallAt(value, true)
            }
            for (let value of layer2) {
                tiles.setWallAt(value, true)
            }
        }

        if (tiles.tileAtLocationEquals(location, layer2tile)) {
            zlayer = 2
            for (let value42 of layer2) {
                tiles.setWallAt(value42, false)
            }
            for (let value52 of layer1) {
                tiles.setWallAt(value52, false)
            }
        } else {
            for (let value of layer2) {
                tiles.setWallAt(value, true)
            }
        }

        if (tiles.tileAtLocationEquals(location, groundTile)) {
            if (!(jumping)) {
                zlayer = 0
                for (let value7 of layer2) {
                    tiles.setWallAt(value7, true)
                }
                for (let value8 of layer1) {
                    tiles.setWallAt(value8, true)
                }
                
            }
        }

        if ((jumping)) {
            if (zlayer >= 1) {
                for (let value3 of layer2) {
                    tiles.setWallAt(value3, false)
                }
                for (let value3 of layer1) {
                    tiles.setWallAt(value3, false)
                }
            } else {
                for (let value4 of layer2) {
                    tiles.setWallAt(value4, true)
                }
                for (let value5 of layer1) {
                    tiles.setWallAt(value5, false)
                }
            }
        }
    }

    /**
     * Check for layer collisions on the current frame
     * @param hitbox the player hitbox to detect collisions on
     * @param layer1tile the tile to let the player hitbox move on
     * @param layer1 the tiles to detect as "layer 1". This should be the same as the previous parameter
     * @param groundTile the tiles to detect as the ground
     */
    //% block="Run layer detections on $hitbox with $layer1tile for layer 1 $layer1 and $groundTile as ground"
    //% hitbox.defl="myHitbox"
    //% hitbox.shadow=variables_get
    //% layer1.shadow=lists_create_with
    //% layer1tile.shadow=tileset_tile_picker
    //% groundTile.shadow=tileset_tile_picker
    export function mainLoop1layer(hitbox: Sprite, layer1: tiles.Location[], layer1tile: Image, groundTile: Image) {
        let location = tiles.getTileLocation(hitbox.tilemapLocation().column, hitbox.tilemapLocation().row)
        if (tiles.tileAtLocationEquals(location, layer1tile)) {
            zlayer = 1
            for (let value22 of layer1) {
                tiles.setWallAt(value22, false)
            }
        } 
        else {
            for (let value of layer1) {
                tiles.setWallAt(value, true)
            }
        }
        if (tiles.tileAtLocationEquals(location, groundTile)) {
            zlayer = 0
            for (let value of layer1) {
                tiles.setWallAt(value, true)
            }
        }

        if ((jumping)) {       
            for (let value3 of layer1) {
                tiles.setWallAt(value3, false)
            }
        } 
        else {
            if (zlayer < 1) {
                for (let value5 of layer1) {
                    tiles.setWallAt(value5, true)
                }   
            }
        }
    }

    /**
     * Set the player sprite position
     * @param player the hitbox of the player sprite. Usually used as a shadow.
     * @param hitbox the player sprite to update the position of.
     */
    //% block="listen for $player jump and update position from $hitbox"
    //% player.defl=mySprite
    //% player.shadow=variables_get
    //% hitbox.defl=myHitbox
    //% hitbox.shadow=variables_get
    export function listenForJump(hitbox: Sprite, player: Sprite) {
        //player.setFlag(SpriteFlag.Ghost, true)
        player.setPosition(hitbox.x, hitbox.y - az)
    }

}


