# Produktidé: TeamTasker
En agil och minimalistisk webbapplikation för att hantera gemensamma uppgifter inom ett team. Appen fokuserar på enkelhet och tydlig prioritering för att stödja ett smidigt arbetsflöde.

## Backlog & User Stories

### 1. Skapa uppgift
**User Story:** Som användare vill jag kunna skriva in en uppgift och spara den i listan så att jag kommer ihåg vad som behöver göras.
* **Task:** Skapa ett HTML-formulär med inputfält och en "Lägg till"-knapp.
* **Task:** Skriva JavaScript-logik för att fånga upp input och spara det i en array.

### 2. Se lista
**User Story:** Som användare vill jag kunna se alla mina skapade uppgifter i en tydlig lista så att jag har överblick över projektet.
* **Task:** Skapa en container i HTML för att rendera ut listan.
* **Task:** Skriva en funktion som loopar igenom sparade uppgifter och skapar listelement via DOM-manipulering.

### 3. Markera som klar
**User Story:** Som användare vill jag kunna markera en uppgift som färdig så att jag ser vad som är avklarat.
* **Task:** Lägg till en checkbox eller "Klar"-knapp vid varje uppgift.
* **Task:** Koppla en CSS-klass (t.ex. line-through) som aktiveras vid klick.

### 4. Radera uppgift
**User Story:** Som användare vill jag kunna ta bort en uppgift som inte längre är aktuell så att listan hålls städad.
* **Task:** Lägg till en "Radera"-knapp på varje uppgiftsrad.
* **Task:** Implementera logik för att ta bort det specifika objektet från listan/arrayen.

### 5. Prioritetsmarkering
**User Story:** Som användare vill jag kunna markera vissa uppgifter som "Viktiga" så att jag vet vad som ska prioriteras först.
* **Task:** Lägg till ett val för prioritet (t.ex. en stjärna eller färgmarkering) i formuläret.
* **Task:** Uppdatera CSS så att viktiga uppgifter får en avvikande färg (t.ex. röd kant).

--- 