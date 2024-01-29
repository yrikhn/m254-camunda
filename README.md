# Blockbuster - Filmverleih Projekt

---

## Zielsetzung
Das Projekt "Blockbuster" zielt darauf ab, einen reibungslosen und effizienten Filmverleihprozess zu schaffen. Mithilfe der Integration von Java Spring Boot und Next.js in die Camunda BPM Plattform sollen Kunden einfach und schnell Filme ausleihen können. Das System soll eine intuitive Benutzeroberfläche für Auswahl, Buchung und Rückgabe von Filmen bieten und dabei sowohl für Kunden als auch für Mitarbeiter benutzerfreundlich und effizient sein.

## Beschreibung des Geschäftsprozesses
Der Geschäftsprozess umfasst folgende Schritte:
1. **Kundenauswahl**: Kunden wählen Filme über die Next.js-basierte Webanwendung.
2. **Rückgabe**: Kunden senden Filme zurück oder beenden den Leihvorgang digital.
3. **Anfrage**: Kunden können Filme anfragen.

## Begriffserklärungen
- **BPMN (Business Process Model and Notation)**: Standard zur Geschäftsprozessmodellierung.
- **DMN (Decision Model and Notation)**: Standard zur Modellierung und Ausführung von Entscheidungen.
- **Gateway**: Steuerelement in BPMN zur Prozessverzweigung.
- **Camunda BPM**: Plattform für Workflow- und Entscheidungsautomation.

## Grafische Darstellung (BPMN/DMN)
Hier wird eine BPMN-Darstellung des Geschäftsprozesses hinzugefügt. (Bitte Grafik einfügen)

## BPMN-Datei (XML)
Eine XML-Datei, die den BPMN-Prozess für "Blockbuster" definiert. (Datei beifügen)

## Gate Way Implementierung
Beschreibung der Implementierung verschiedener Gateways im Prozess, einschließlich Entscheidungslogik und Verzweigungsbedingungen.

## Implementierte Software Komponenten
- **HTML Forms**: Für die Kundenschnittstelle zur Filmauswahl.
- **Javascript/Next.js**: Für dynamische Webseiten und Benutzerinteraktion.
- **Java Spring Boot**: Backend-Logik und Integration mit Camunda BPM.
- **GUI Design**: Ansprechendes und intuitives Benutzeroberflächendesign.

# Test Cases und Testprotokoll

## 1. Kundenauswahl

### Test Case 1: Auswahl eines Films
- **Beschreibung**: Überprüfen, ob der Kunde einen Film aus dem Katalog auswählen kann.
- **Schritte**:
  1. Kunde navigiert zur Filmauswahlseite.
  2. Kunde wählt einen Film aus dem Katalog.
  3. Kunde klickt auf "Ausleihen".
- **Erwartetes Ergebnis**: Der ausgewählte Film wird dem Profil des Kunden hinzugefügt.
- **Tatsächliches Ergebnis**: Der Film wird dem Profil des Kunden hinzugefügt.
- **Status**: OK

## 2. Rückgabe

### Test Case 1: Digitale Rückgabe
- **Beschreibung**: Überprüfen der digitalen Rückgabefunktion für Filme.
- **Schritte**:
  1. Kunde navigiert zu "Meine Ausleihen".
  2. Kunde wählt einen ausgeliehenen Film und klickt auf "Rückgabe".
- **Erwartetes Ergebnis**: Der Film wird als zurückgegeben markiert.
- **Tatsächliches Ergebnis**: Der Film wird als zurückgegeben markiert.
- **Status**: OK

## 3. Anfrage

### Test Case 1: Film anfragen
- **Beschreibung**: Überprüfen, ob Kunden Filme anfragen können, die aktuell nicht verfügbar sind.
- **Schritte**:
  1. Kunde navigiert zur Anfrageseite.
  2. Kunde gibt Titel des gewünschten Films ein und sendet Anfrage.
- **Erwartetes Ergebnis**: Anfrage wird gesendet und Kunde erhält Bestätigung.
- **Tatsächliches Ergebnis**: Anfrage wird gesendet und Kunde erhält Bestätigung.
- **Status**: OK

---

**Testprotokoll**:

- **Datum der Testdurchführung**: 23.01.2024
- **Tester**: Jonas Baars
- **Bemerkungen**:Funktioniert einwandfrei
- **Schlussfolgerungen**: Alles funktioniert ohne probleme

---


# Reflexion

In diesem Modul beschäftigten wir uns intensiv mit der Entwicklung eines Spring Boot-Backends beschäftigt und verwendeten dabei den Camunda Modeler, um Prozessmodelle für Film-Anfragen und -Rückgaben zu erstellen. Zusätzlich entwickelten wir ein Next.js-Frontend, das mit den Prozessinstanzen von Camunda interagierte. Dieses Projekt bot mir die Gelegenheit, tief in die Welt von Camunda einzutauchen und meine Fähigkeiten in der Backend-Entwicklung sowie im Umgang mit Prozessmanagement-Tools zu erweitern. Einer der wichtigsten Lerneffekte war die Erkenntnis, wie komplexe Prozesse effektiv modelliert und automatisiert werden können. Der Einsatz von Camunda hat uns nicht nur die theoretischen Grundlagen, sondern auch die praktische Anwendung von BPMN (Business Process Model and Notation) nähergebracht. Diese Fähigkeiten sind besonders in Bereichen wie Prozessoptimierung und Workflow-Automatisierung wertvoll.
Trotz des klaren Nutzens dieser Technologien fragen wir uns jedoch, inwieweit das Gelernte in der Zukunft anwendbar sein wird, insbesondere angesichts der sich schnell entwickelnden IT-Landschaft. Dies bleibt eine offene Frage, aber die erworbenen Kenntnisse und Fertigkeiten sind zweifellos eine solide Basis in diesem Thema für die IT.
Insgesamt war das Modul eine äusserst lehrreiche Erfahrung. Es hat uns nicht nur neues technisches Wissen vermittelt, sondern auch Spass gemacht, was das Lernen umso angenehmer gestaltete. Durch die Kombination von theoretischem Wissen und praktischer Anwendung konnte ich ein tiefes Verständnis für die Materie entwickeln. Diese Erfahrung wird zweifellos einen wertvollen Beitrag zu meinem zukünftigen beruflichen Werdegang leisten.



---

**Fußzeile:** Blockbuster - Filmverleih Projekt | © 2024
