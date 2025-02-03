# BF Task

Projekt stworzyłem za pomocą **Vite + React + Typescript + Tailwind**, na podstawie dostarczonego layoutu UI w Figmie, z zachowaniem proporcji i podejściem "pixel perfect", które zostało wyskalowane poprzez manipulację właściwości "font-size" dla elementu html, dla poszczególnych rozmiarów ekranu.

W projekcie zainspirowałem się podejściem "Atomic Design", tyle że z pewnym odstępstwem. Ze względu na prostotę aplikacji, postanowiłem, że elementy *molecules* oraz *organisms*, wbrew dobrym praktykom bycia czystymi komponentami - czyli bez zarządzania stanem - będą miały możliwość zarządzania tymże stanem.

Na taką decyzję miało wpływ to, że chciałem, aby projekt był zrobiony w sposób praktyczny, pragmatyczny, i jednocześnie najprostszy, zarówno do czytania, jak i zmiany. Czy mi się udało? Nie wiem, choć się domyślam... :)

---

## 1. Uruchomienie aplikacji

**Aplikację można uruchomić na trzy sposoby:**

***a) Wersja developerska poprzez Vite***

  ```bash
    npm run dev
  ```

Po wpisaniu komendy, aplikację można zobaczyć pod adresem: http://localhost:5173

***b) Wersja "produkcyjna" za pomocą wtyczki VSCode **Live Server*****

  ```bash
    npm run build
  ```

Gdy uruchamiamy komendę, zbudowana aplikacja zostanie stworzona w folderze ***dist***.

Dla systemów Unix'owych, należy uruchomić komendę:

  ```bash
    npm run fixpaths
  ```

natomiast dla Windowsa:

  ```shell
    npm run fixpaths-win
  ```

Spowoduje to, że przy uruchomieniu Live Servera z wtyczki VSCode, podmieni nam ścieżki do folderów ***/asset*** w ***./dist/index.html*** z absolutnych na relatywne.

Ostatnim krokiem jest wejście w plik ***./dist/index.html*** oraz włączenie Live Servera poprzez wtyczkę.

Domyślnym adresem, pod którym można otworzyć aplikację jest http://localhost:5500

***c) Stworzenie wersji produkcyjnej i hostowanie na serwerze WWW***

  ```bash
    npm run build
  ```

Dla tego wariantu, pliki będą dostępne z poziomu URL, który wystawiany jest na serwerze WWW.

## 2. Feature aplikacji

- dodanie tekstu
- dodanie obrazka
- usunięcie obrazka lub tekstu (zarówno kliknięcie ikony usunięcia, jak i kliknięcie przycisku "Delete" na klawiaturze, gdy element zaznaczony)
- zmiana rozmiaru i koloru wybranego tekstu
- zmiana rozmiaru wybranego obrazka
- możliwość zmiany pozycji wybranego tekstu lub obrazka
- możliwość eksportowania stworzonej kreacji do PNG (1080x1350)
- dodanie i zmiana tła
- zresetowanie dotychczasowej kreacji
- responsywne zachowanie, przy jednoczesnym zachowaniu prawidłowego zachowania i wyglądu komponentów aplikacji (jest mały wyjątek, w przemyśleniach niżej)
- poprawiono literówkę z UI w Figmie (6.0.0, treść przycisku "Canel" na "Cancel")

## 3. Możliwości ulepszenia aplikacji

- należy poprawić funkcjonalność "Eksportowania do PNG" - tutaj jest problem taki, że przy Textarea ucina tekst, gdy jest zbyt długi (problem leży prawdopodobnie w paczce html2canvas lub jego użyciu - jeszcze nad tym popracuję :))
- do projektu można dodać testy
- można dodać opcję "Wysuwanie na wierzch" elementów, które chcemy, aby były wyżej niż inne (przydatne przy tekście i obrazku nachodzącymi na siebie)
- można dodać zablokowanie użycia przycisku "Export to PNG", gdy użytkownik nie zaczął edytować lub zresetował kreację
- stworzenie Dockerfile, który utworzyłby serwer WWW (Apache), zbudował aplikację i uruchomił ją
- trzeba poprawić ustawienie pozycji elementu (tekst, obrazek) przy skalowaniu w góre (zwiększaniu ekranu) - w tej sytuacji pozycja elementu zostaje taka sama, a wielkość całej kreacji zwiększa się, więc element fizycznie się przesuwa. Obsłużone jest natomiast poprawne ustawianie pozycji przy zmniejszaniu kreacji. 