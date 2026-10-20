# Patroa Auto Socorro e Transportes

Site institucional em português para a Patroa, de Araraquara–SP. Construído com HTML, CSS e JavaScript, sem dependências de instalação.

## Abrir localmente

Com Python 3 instalado, execute na pasta do projeto:

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory dist
```

Abra http://127.0.0.1:8765/.

## Estrutura e edição

- `dist/index.html`: página inicial e simulação visual de transporte.
- `dist/servicos/`: serviços e páginas de remoção de caminhões, transporte de máquinas e carreta prancha.
- `dist/sobre/`: apresentação da empresa.
- `dist/atendimento/`: orientações de atendimento.
- `dist/contato/`: formulário de orçamento.
- `dist/privacidade/`: informações de privacidade.
- `dist/assets/site.css`: estilos e adaptação para celular.
- `dist/assets/site.js`: navegação, simulação e preparação da mensagem de orçamento.
- `dist/assets/`: imagens e ícone do site.

Edite diretamente os arquivos em `dist`. Não há etapa de compilação.

## Funcionamento

O formulário prepara uma mensagem para revisão antes de abrir o WhatsApp. O visitante precisa enviar a mensagem na conversa; o site não envia pedidos automaticamente nem armazena solicitações em banco de dados.

A simulação da página inicial é demonstrativa. Não representa rastreamento, percurso rodoviário, prazo ou preço.

As imagens de transporte geradas por IA são ilustrativas e não comprovam a frota da empresa. Os dados institucionais e contatos devem ser confirmados com a empresa antes da publicação.

## Hospedagem

O GitHub Pages publica o site em https://usabra.github.io/patroa-auto-socorro-transportes/.

O fluxo `.github/workflows/pages.yml` publica automaticamente as alterações enviadas à branch `main`. Em Settings → Pages, a fonte deve ser **GitHub Actions**.

O script `scripts/build_pages.py` copia `dist` para `_site` e adapta os caminhos de páginas, imagens e estilos ao endereço do Pages. Os arquivos originais continuam funcionando no servidor local. A variável `PAGES_BASE_PATH`, fornecida pelo fluxo, permite adaptar o endereço caso seja configurado um domínio próprio.

Em outra hospedagem estática com domínio dedicado, use diretamente `dist` como diretório público.
