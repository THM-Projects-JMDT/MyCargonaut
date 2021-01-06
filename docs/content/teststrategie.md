# Teststrategie

## Frontend

Im Frontend verwenden wir `react-testing-library`, um die einzelnen Komponenten zu testen.
Hierbei wird für jede Komponente eine Testdatei namens `[component-name].text.tsx` erstellt, welche die verschiedenen Testfälle enthält.
Bei den Tests handelt es sich im Allgemeinen um Blackbox-Tests: es werden nicht interne Implementierungsdetails getestet, sondern eher allgemeine Anforderungen aus der Sicht des Users.

### Ausführung der Tests
```
cd frontend
npm test
```

## Backend

Für jedes Nest.js-Modul wird eine Test-Datei namens `[module_name].spec.ts` erstellt, in welcher Testfälle sowohl für den jeweiligen Service als auch für den Controller definiert werden. Hier handelt es sich eher um Whitebox-Tests, es wird also mit Kenntnis über die innere Funktionsweise der Server-Funktionen getestet.

### Ausführung der Tests
```
cd backend
npm test
```

## Continuous Integration

Frontend- und Backend-Tests sind Bestandteil der CI-/CD-Pipeline und werden bei jedem Push automatisiert ausgeführt. Merge-Requests werden nicht akzeptiert (können nicht gemerget werden), wenn die Tests nicht erfolgreich durchlaufen.