#!/bin/bash

WEBHOOK_URL="https://hooks.slack.com/services/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"
MESSAGE="¡Hola, equipo Este es un mensaje enviado desde un script de Bash usando un webhook."

curl -H "Content-type: application/json" \
--data '{"channel":"cloud-reports","blocks": [{"type": "section","text": {"type": "mrkdwn","text": "Hola equipo dev :wave:"}},{"type":"section","text":{"type": "mrkdwn","text": "Estamos desplegando la app de BIOD a produccion :rocket:. Algunas consideraciones:"}},{"type": "section","text": {"type": "mrkdwn","text": ":checkered_flag: Recuerden estar pendientes de los errores generados y solucionarlos lo mas pronto posible  \n :checkered_flag: Mejorar la experiencia de usuario al dar soporte oportuno \n :checkered_flag: Colaborar entre todos para resolver los problemas"}},{	"type": "section","text": {"type": "mrkdwn","text": ":pikachu-hello:  !!Happy coding!!"}}]}' \
-X POST $WEBHOOK_URL




