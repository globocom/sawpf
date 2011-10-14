Salve a web, por favor
===============================

Navegadores velhos e desatualizados não evoluem junto com os padrões web
e são cheios de bugs, afetando a qualidade dos sites e fazendo com que os
desenvolvedores gastem mais tempo para adaptar os sites a esses browsers
obsoletos.

"Salve a web, por favor" é um esforço para eliminar esses navegadores.



Como funciona?
--------------

Se o usuário estiver usando um browser antigo uma mensagem amigável vai
pedir para atualizar o browser.

Todos os scripts e imagens utilizados pelo sawpf são hospedados na
Globo.com usando a melhor rede de distribuição de conteúdo do Brasil.



Como usar?
----------

É só incluir no antes de fechar a tag body o seguinte código:

    <script src="http://sawpf.com/1.0.js"></script>


Exemplo de utilização
---------------------

    <html>
      <head>
        <meta http-equiv="Content-type" content="text/html; charset=utf-8">
        <title>Título</title>
      </head>
      <body>
        <h1>Meu site</h1>
        ... todo o html do seu site ...
        <script type="text/javascript" src="http://sawpf.com/1.0.js"></script>
      </body>
    </html>
