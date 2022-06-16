Set WshShell = CreateObject("WScript.Shell")
WshShell.Run chr(34) & "C:PATH/TO/YOUR/FILES/example.background.vbs" & Chr(34), 0
Set WshShell = Nothing