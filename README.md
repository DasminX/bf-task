# BF Task

Repozytorium zostało stworzone za pomocą Vite + React + Typescript + Tailwind.

1. Uruchomienie aplikacji

Aplikację można uruchomić na trzy sposoby:

a) Wersja developerska poprzez Vite

  ```bash
    npm run dev
  ```

Po wpisaniu komendy, aplikację można zobaczyć pod adresem: http://localhost:5173

b) Wersja "produkcyjna" za pomocą wtyczki VSCode **Live Server**

  ```bash
    npm run build
  ```

Gdy uruchamiamy komendę, zbudowana aplikacja zostanie stworzona w folderze **dist**.

Dla systemów Unix'owych, należy uruchomić komendę:

  ```bash
    npm run fixpaths
  ```

natomiast dla Windowsa:

  ```shell
    npm run fixpaths-win
  ```

Spowoduje to, że przy uruchomieniu Live Servera z wtyczki VSCode, podmieni nam ścieżki do folderów /asset w ./dist/index.html z absolutnych na relatywne.

Ostatnim krokiem jest wejście w plik ./dist/index.html oraz włączenie Live Servera poprzez wtyczkę.

Domyślnym adresem, pod którym można otworzyć aplikację jest http://localhost:5500

c) Stworzenie wersji produkcyjnej i hostowanie na serwerze WWW

  ```bash
    npm run build
  ```

Dla tego wariantu, pliki będą dostępne z poziomu URL, który wystawiany jest na serwerze WWW.

