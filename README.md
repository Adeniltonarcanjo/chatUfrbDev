# chatUfrbDev

Trabalho desenvolvido para a matéria de sistemas distribuídos.
O projeto constitui em uma aplicação de chat real-time com Socket.IO. O aplicativo de chat requer um canal de comunicação através do qual um cliente pode enviar mensagens que são redistribuídas para outros participantes na sala de chat.

Resultado desejado:
Uma arquitetura multservidor, no qual o cliente fará uma conexão WebSocket com um balanceador de carga que encaminha o tráfego para um grupo de servidores. Esses servidores serão responsavéis por gerenciar as conexões via WebSocket e os dados transmitidos por eles. Depois que uma conexão WebSocket é estabelecida com um servidor de aplicativos, essa conexão é mantida e os dados fluem para o aplicativo em ambas as direções. O balanceador de carga distribui solicitações para uma conexão WebSocket a servidores, o que significa que dois clientes podem estabelecer uma conexão WebSocket com diferentes servidores.

Os aplicativos devem se comunicar entre si para redistribuir mensagens. Essa comunicação é necessária porque uma mensagem pode ser transmitida entre usuarios conectados em diferentes servidores. Será necessario implementar uma maneira de gerenciar a conexão do cliente garantido acomunicação entre os diferentes clientes em diferentes servidores e tornar o sistema escalavél . Uma solução será utilizar o Balanceador de carga e o redis Pub/Sub que atua como Publish–subscribe para garatir a comunicação entre os servidores.

Arquitetura:

![arquiteturaimagem](https://user-images.githubusercontent.com/69324694/135664817-be211a03-5e92-49a8-ad30-5de6f7ae8fd7.jpg)



Aplicação em construção :

Tela Inicial do aplicativo:

![telaInicial](https://user-images.githubusercontent.com/69324694/135656478-58716752-e28a-47fb-88b6-fb530bca98b0.png)

Tela de chat:

![telaChat](https://user-images.githubusercontent.com/69324694/135663574-df9c9b34-1b82-4db5-9c1b-b4ac668c5742.png)


A aplicação ainda não está finalizada, faltando implementar o Elastic Load Balancing e o Redis, como sugestão  O Amazon ElastiCache para Redis:


os aplicativos estão rodando em duas instancias com os endereços: http://3.83.182.215:3000/     e   http://54.173.141.133:3000/




