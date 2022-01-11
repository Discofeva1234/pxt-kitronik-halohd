kitronik_halo_hd.onAlarmTrigger(function () {
    music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
})
input.onButtonPressed(Button.A, function () {
    if (setTimeMode == true) {
        Minutes += 1
    } else if (setAlarmMode == true) {
        alarmMinutes += 1
    } else {
        silenceAlarm = true
    }
})
input.onButtonPressed(Button.AB, function () {
    if (setTimeMode == true || setAlarmMode == true) {
        enterNewTime = true
    } else {
        setTimeMode = true
    }
})
input.onButtonPressed(Button.B, function () {
    if (setTimeMode == true) {
        Minutes += 10
    } else if (setAlarmMode == true) {
        alarmMinutes += 10
    } else {
        setAlarmMode = true
    }
})
let alarmHours = 0
let Hours = 0
let silenceAlarm = false
let alarmMinutes = 0
let Minutes = 0
let setAlarmMode = false
let enterNewTime = false
let setTimeMode = false
kitronik_halo_hd.setBuzzerPin()
let haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
setTimeMode = false
enterNewTime = false
setAlarmMode = false
basic.forever(function () {
    if (setTimeMode == true) {
        Minutes = kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes)
        Hours = kitronik_halo_hd.readTimeParameter(TimeParameter.Hours)
        if (Hours >= 12) {
            Hours += -12
        }
        while (enterNewTime == false) {
            if (Minutes > 59) {
                Minutes = 0
                Hours += 1
                if (Hours == 12) {
                    Hours = 0
                }
            }
            haloDisplay.clear()
            haloDisplay.setZipLedColor(Minutes, kitronik_halo_hd.colors(ZipLedColors.Green))
            haloDisplay.setZipLedColor(Hours * 5, kitronik_halo_hd.colors(ZipLedColors.Blue))
            haloDisplay.show()
            basic.pause(1)
        }
        kitronik_halo_hd.setTime(Hours, Minutes, 0)
        enterNewTime = false
        setTimeMode = false
    } else if (setAlarmMode == true) {
        alarmMinutes = kitronik_halo_hd.readTimeParameter(TimeParameter.Minutes)
        alarmHours = kitronik_halo_hd.readTimeParameter(TimeParameter.Hours)
        if (Hours >= 12) {
            Hours += -12
        }
        while (enterNewTime == false) {
            if (Minutes > 59) {
                Minutes = 0
                Hours += 1
                if (Hours == 12) {
                    Hours = 0
                }
            }
            haloDisplay.clear()
            haloDisplay.setZipLedColor(Minutes, kitronik_halo_hd.colors(ZipLedColors.Green))
            haloDisplay.setZipLedColor(Hours * 5, kitronik_halo_hd.colors(ZipLedColors.Blue))
            haloDisplay.show()
            basic.pause(1)
        }
        kitronik_halo_hd.simpleAlarmSet(kitronik_halo_hd.AlarmType.Single, alarmHours, alarmMinutes, kitronik_halo_hd.AlarmSilence.userSilence)
    } else {
        haloDisplay.clear()
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Seconds), kitronik_halo_hd.colors(ZipLedColors.Red))
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Minutes), kitronik_halo_hd.colors(ZipLedColors.Green))
        haloDisplay.setZipLedColor(kitronik_halo_hd.readTimeForZip(TimeParameter.Hours), kitronik_halo_hd.colors(ZipLedColors.Blue))
        haloDisplay.show()
    }
    if (silenceAlarm == true) {
        kitronik_halo_hd.simpleAlarmOff()
        music.stopMelody(MelodyStopOptions.All)
    }
})
