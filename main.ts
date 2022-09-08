input.onLogoEvent(TouchButtonEvent.Touched, function () {
    basic.showString(control.deviceName())
    music.stopMelody(MelodyStopOptions.All)
})
input.onButtonPressed(Button.A, function () {
    Mtr = 1
})
pins.onPulsed(DigitalPin.P2, PulseValue.High, function () {
    pins.digitalWritePin(DigitalPin.P13, 0)
    pins.digitalWritePin(DigitalPin.P14, 1)
    Rlt = 0
    basic.showString("0")
})
input.onSound(DetectedSound.Loud, function () {
    Mtr = 1 - Mtr
    basic.showIcon(IconNames.StickFigure)
    basic.showNumber(Mtr)
})
pins.onPulsed(DigitalPin.P1, PulseValue.High, function () {
    pins.digitalWritePin(DigitalPin.P14, 0)
    pins.digitalWritePin(DigitalPin.P13, 1)
    Rlt = 1
    basic.showString("1")
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    受信データ = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (受信データ == "s") {
        Mtr = 1
    } else if (受信データ == "b") {
        Mtr = 0
    }
    basic.showString("BT")
    basic.showNumber(Mtr)
})
input.onButtonPressed(Button.B, function () {
    Mtr = 0
})
let 受信データ = ""
let Mtr = 0
let Rlt = 0
bluetooth.startUartService()
let Flg = 0
Rlt = 0
Mtr = 0
pins.digitalWritePin(DigitalPin.P0, 0)
pins.digitalWritePin(DigitalPin.P13, 0)
pins.digitalWritePin(DigitalPin.P14, 0)
music.setVolume(31)
input.setSoundThreshold(SoundThreshold.Loud, 255)
basic.forever(function () {
    if (Mtr == 1 && Flg == 0) {
        Flg = 1
        pins.digitalWritePin(DigitalPin.P0, 1)
        basic.showString("s")
        music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.ForeverInBackground)
    } else if (Mtr == 0 && Flg == 1) {
        Flg = 0
        pins.digitalWritePin(DigitalPin.P0, 0)
        basic.showString("b")
        if (Rlt == 1) {
            music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.OnceInBackground)
        } else {
            music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.OnceInBackground)
        }
    }
})
