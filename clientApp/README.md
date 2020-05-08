<h2>ClientApp - chat web uvv</h2>
<p>
  Essa aplicação está sendo desenvolvida com react js.
</p>

<h3>
    Como instalar o projeto:
</h3>
<ul>
    <li><p>Passo 1: clone o repositório em algum diretório de seu computador.</p></li>
    <li>
      <p>Passo 2: Abra o diretório clientApp e digite <b>yarn install</b> para instalar as dependências do projeto.</p>
    </li>
    <li>
      <p>Passo 3: Digite <b>yarn start</b> para iniciar o projeto, ele estará funcionando na porta 3000.</p>
    </li>
</ul>

<h3>
  Design patterns:
</h3>
<p>
  O padrão para desenvolvimento adotado foi o <b>EN</b>, ou seja: Todas as variáveis, funções e arquivos que estiverem no projeto devem ser escritas em inglês, além disso o padrão para escrita de variáveis e funções é o <b>sensitiveCase</b>.
  Foi criado uma estrutura de pastas para melhor padronização do projeto, ela foi dividida da seguinte forma:
</p>
<ul>
  <li>
    <p>
      Pasta <b>src</b>: É aonde está localizado os arquivos "<b>source</b>" da aplicação, no interior dela está sendo feito 
      uma divisão da seguinte maneira:
      <li>
         <p>
           <b>
            components:
          </b> 
            Aqui se localiza todos os componentes que serão utilizados na aplicação, o ideal é que se crie uma pasta
           para cada componente. Na raíz da pasta <b>components</b> existe um arquivo <b>index.js</b>, esse arquivo é responsável            pela exportação de todos os componentes, siga o padrão.
        </p>
      </li>
      <li>
        <p>
          <b>constants:</b> Aqui se localiza todas as funções, objetos ou variáveis <b>CONSTANTES</b>, ou seja, que  não se altera. Na raíz da pasta <b>constants</b> existe um arquivo <b>index.js</b>, esse arquivo é responsável pela exportação de todos os componentes, siga o padrão.
        </p>
        <p>
      </li>
      <li>
        <p>
          <b>pages:</b> Aqui se localiza todas as páginas da aplicação. Na raíz da pasta <b>pages</b> existe um arquivo <b>index.js</b>, esse arquivo é responsável pela exportação de todos os componentes, siga o padrão.
        </p>
      </li>
      <li>
        <p>
          <b>utils:</b> Aqui se localiza todas as funções utilitárias, que se podem utilizar em mais de uma situação.  Na raíz da pasta <b>utils</b> existe um arquivo <b>index.js</b>, esse arquivo é responsável pela exportação de todos os componentes, siga o padrão.
        </p>
      </li>
      <li>
        <b>services:</b> Aqui se localiza os serviços da aplicação, como por exemplo o <b>axios</b> para acessar o endpoint da api. Na raíz da pasta <b>services</b> existe um arquivo <b>index.js</b>, esse arquivo é responsável pela exportação de todos os componentes, siga o padrão.
      </li>
    </p>
  </li>  
<ul>
