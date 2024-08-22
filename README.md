## Testes

### Testes unitários

Para rodar os testes unitários basta executar:
```sh
npm t
```
### Testes E2E

Antes de rodar os restes e2e suba o container postgres com o seguinte comando:
```sh
docker compose up -d
```

em seguida execute o comando para rodar os testes e2e:
```sh
npm run test:e2e
```