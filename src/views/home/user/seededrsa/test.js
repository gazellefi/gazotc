const RSA = require("./rsa");
const seed = "praise you muffin lion enable neck grocery crumble super myself license ghost"
const key = new RSA(seed);
key.generate(2048).then(function(key) {
	console.log(key.privateKey)
	console.log(key.publicKey)
}).catch(function(error){
	console.error(error)
})

/*
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEA3NdzUHz53SeYrpoR1JXtx/IokPeMhMcNEp3HtB7DW3rTRImg
SlxPv2doHSbYOZ1eEGexmAeJ7ClySm8Icj1vgetNq1mNTfi07LXHO0lQvburYOcX
q1yk+OshdurWfoIa7tsiiregYF1cjGh9kdjUaI+x59OUW+s1pWS9sfhnDwaK/lyQ
TG6vCSiyXX3tktc0Sso+8xOMg41jX0OZayKWNc63K0CHtUlVvTNqQ3x7W1YM1wyH
rzOm8MqRF1behCva73F9M8f1+zo9aqmASSgxs7wGQyozit/F/I4gDKEnrW2+1b+z
OKwQP+lKypSEeanmkZj3H1k95R2uctoOkuBgjQIDBlU3AoIBAEoVNIls76hBbflj
r8XsrxO/jBtJIp0vsRHFWbE0QHgl8VNS7fhV/PzgxR/cCJLRG/Ny5j4mnT0gNhxy
u62WAfPyEtLe+cwewmc73EdudPkDEBkCCwAHEYT7wuoBNN5UPm4916+kdKDQpcNN
LYk9mdZF3W/2j7kREKlAhAKsUz+yTA864w4iKKbVHnVAKSBMacfQI9FJ4rS/DwtE
SaE2IH4XO/CBm3jhnQ8kG0RHOssfVReWcnArdigmm4xJ8qGfE+BDzkLbvDbCRh3g
KIG1Tkr4tat5Q0eSkYJqV5fJ1igc97ARlBk3mBJ+aFHzV9Yn9eLWyeKonYHCtxDc
nuShjycCgYEA8o1va8Lg4e8m93UScRuQkwIup1CW+BlxYefIZTS9RQQ1CuBYQASU
9xOMN+RgJyRB+Kr7ACGmfpw9ASV7NNUF88aaUbx5HbEqXd18+5XEa4nbTqqjtCOH
rbSLYMTVClB1hTWqg2xwzbAcJ/rQeqlE9piVwV4MaOhIn9XgD0OBbrkCgYEA6RXf
BEpoLVjZYR8rbl6SIltMDINgFfS3D7uHOdQn+64b6Z2Hc25GZspqiwGbajoohHF2
pPGcqTOd+13rs6n40oAmHvO+8ygkipOtFKvR3blt27QlVZT6rtO34L38SJ+YvzVi
LgEMA/EQoaqWzWlH4O1/MTx3XlwZJdeJNRlr9nUCgYB8TtPcnLZHlLytM1Av8HWr
ZXAvscradmTPcWxg362lZtiamZqyfR8f7IjlJMe+Qz3BDfl7amVFxHA8chuSqm5F
n7ZAUeB089yrzAk1yWJkijEGkBYuGIMDWis9GLCK1QwOUcys4GcflUyxTOXst3qm
VY/h6RLOjYVadxycHSgkfwKBgBVT43uKpu5+7avz6aQDiKTVtBsc991UkMkHNOuO
R8Yr1wdWMl6D4525y+zCsy4CuYmnpcGz15GB7vgmH1ORnrc3SaCj72lNaTnP7OpK
36xXZU59/s5XrwfW6MVFcR0fbGdngF/7i86gqeyF+20Pe+GKXtOX1bP8Niu6OyDf
w9enAoGAU1rF0ty3hi6uJgG/4UPyZBeKlYJA1xqgXJrsSbD4UE3yMpn+MPGEZCr3
NfwNbc03UcrJoLva8mbspVz73udtR4SiecwD7o44S23+zn63w4NdEEQ8+KF2J1wT
XJqOG8nR/SfQHt/TH3ErQK4OfqEw/wExadhSZgCIUlpuULmi2MQ=
-----END RSA PRIVATE KEY-----

-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3NdzUHz53SeYrpoR1JXt
x/IokPeMhMcNEp3HtB7DW3rTRImgSlxPv2doHSbYOZ1eEGexmAeJ7ClySm8Icj1v
getNq1mNTfi07LXHO0lQvburYOcXq1yk+OshdurWfoIa7tsiiregYF1cjGh9kdjU
aI+x59OUW+s1pWS9sfhnDwaK/lyQTG6vCSiyXX3tktc0Sso+8xOMg41jX0OZayKW
Nc63K0CHtUlVvTNqQ3x7W1YM1wyHrzOm8MqRF1behCva73F9M8f1+zo9aqmASSgx
s7wGQyozit/F/I4gDKEnrW2+1b+zOKwQP+lKypSEeanmkZj3H1k95R2uctoOkuBg
jQIDBlU3
-----END PUBLIC KEY-----
*/