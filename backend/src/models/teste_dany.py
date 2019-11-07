import re  # a biblioteca re é para expressão regular (Regular Expression)

# Procura todas as regras que batem com o padrão
# re.findall(pattern, string)

pattern = '^[0-9]{2}([^@]+)'
texto = '952345SA#124@APNNE'

re.findall(pattern, texto)
 # resultado ['2345SA#124']
