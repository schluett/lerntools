// tasks_en.js – English texts for the quiz "Derivatives" (British English).
// The tasks themselves (structure, option order A–D, numerical functions) live only in
// tasks.js; this file translates their German texts: first the exact table, then the
// pattern rules for recurring sentences. Decimal commas become decimal points.
// Generated from the German strings; untranslated texts are reported by index.html?check.

const TASK_TEXT_EN = {
  "Was ist der beste erste Schritt?": "What is the best first step?",
  "T:Produktregel": "T:Product rule",
  "Malpunkte stehen nur innerhalb der Summanden (z. B. $3 \\cdot x^4$). Insgesamt besteht $f$ aus vier Summanden.": "The multiplication dots appear only inside the terms (e.g. $3 \\cdot x^4$). Overall, $f$ consists of four terms.",
  "T:Summenregel": "T:Sum rule",
  "T:Potenzregel": "T:Power rule",
  "Die Potenzregel brauchen wir für die einzelnen Summanden. $f$ besteht aber aus mehreren Summanden – diese werden zuerst getrennt.": "We need the power rule for the individual terms. But $f$ consists of several terms – these are separated first.",
  "T:Funktionsterm umformen": "T:Rewrite the function",
  "Hier lässt sich der Funktionsterm nicht sinnvoll vereinfachen; man kann direkt mit einer Ableitungsregel beginnen.": "The function cannot be simplified in a useful way here; you can start directly with a differentiation rule.",
  "\\text{Summenregel: jeder Summand wird einzeln abgeleitet.}": "\\text{Sum rule: each term is differentiated separately.}",
  "Bei der Potenzregel verringert sich der Exponent um 1: $x^4 \\to 4x^3$.": "With the power rule, the exponent decreases by 1: $x^4 \\to 4x^3$.",
  "$x = x^1$ hat die Ableitung $1 \\cdot x^0 = 1$, also ist $(2x)' = 2 \\cdot 1$.": "$x = x^1$ has the derivative $1 \\cdot x^0 = 1$, so $(2x)' = 2 \\cdot 1$.",
  "$2x$ hängt von $x$ ab; die Gerade $2x$ hat die Steigung 2.": "$2x$ depends on $x$; the straight line $2x$ has slope 2.",
  "Eine konstante Funktion hat überall die Steigung 0.": "A constant function has slope 0 everywhere.",
  "$-9$ hängt nicht von $x$ ab; eine additive Konstante fällt beim Ableiten weg.": "$-9$ does not depend on $x$; an additive constant vanishes when differentiating.",
  "Mit dem Umformen zu $2x^{-3}$ reicht die Potenzregel: $f'(x) = -6x^{-4}$ – dasselbe Ergebnis wie $-\\frac{6}{x^4}$, aber mit weniger Schritten.": "After rewriting as $2x^{-3}$, the power rule is enough: $f'(x) = -6x^{-4}$ – the same result as $-\\frac{6}{x^4}$, but with fewer steps.",
  "$x^3$ steht im Nenner. Für die Potenzregel muss $f$ erst als Potenz geschrieben werden.": "$x^3$ is in the denominator. To use the power rule, $f$ must first be written as a power.",
  "T:Quotientenregel": "T:Quotient rule",
  "T:Kettenregel": "T:Chain rule",
  "Hier wird nichts in eine andere Funktion eingesetzt.": "Nothing is substituted into another function here.",
  "Wie lässt sich $f$ umformen?": "How can $f$ be rewritten?",
  "Ein Bruch mit $x^3$ im Nenner wird zu $x$ hoch minus 3: $\\frac{1}{x^n} = x^{-n}$.": "A fraction with $x^3$ in the denominator becomes $x$ to the power of minus 3: $\\frac{1}{x^n} = x^{-n}$.",
  "Die 2 steht im Zähler und bleibt als Faktor stehen: $\\frac{2}{x^3} = 2 \\cdot \\frac{1}{x^3}$.": "The 2 is in the numerator and remains as a factor: $\\frac{2}{x^3} = 2 \\cdot \\frac{1}{x^3}$.",
  "Nach dem Umformen steht kein Bruch mehr da.": "After rewriting, there is no fraction any more.",
  "$x^{-3}$ ist eine Potenz von $x$ selbst; es wird nichts eingesetzt.": "$x^{-3}$ is a power of $x$ itself; nothing is substituted.",
  "\\text{Potenzregel; der Faktor 2 bleibt stehen.}": "\\text{Power rule; the factor 2 remains.}",
  "Welche Form erhält man, wenn man die Zahlen ausrechnet?": "Which form do you get when you work out the numbers?",
  "Nur die Zahlfaktoren werden multipliziert; der Exponent $-4$ bleibt.": "Only the numerical factors are multiplied; the exponent $-4$ stays.",
  "Eine konstante Funktion hat die Ableitung 0.": "A constant function has the derivative 0.",
  "Der Exponent verringert sich um 1.": "The exponent decreases by 1.",
  "Wie setzt die Quotientenregel die Bausteine zusammen?": "How does the quotient rule combine the building blocks?",
  "Zuerst wird der Zähler abgeleitet: $u' \\cdot v - u \\cdot v'$.": "The numerator is differentiated first: $u' \\cdot v - u \\cdot v'$.",
  "Ein Quotient wird nicht einfach Zähler durch Nenner abgeleitet; die Quotientenregel lautet $\\frac{u' v - u v'}{v^2}$.": "A quotient is not differentiated simply as numerator over denominator; the quotient rule is $\\frac{u' v - u v'}{v^2}$.",
  "Welche Form erhält man, wenn man die Zahlen ausrechnet und kürzt?": "Which form do you get when you work out the numbers and cancel?",
  "Im Zähler steht $0 - 6x^2 = -6x^2$.": "The numerator is $0 - 6x^2 = -6x^2$.",
  "$(x^3)^2 = x^6$; gekürzt mit $x^2$ bleibt $x^4$.": "$(x^3)^2 = x^6$; cancelling $x^2$ leaves $x^4$.",
  "Der Logarithmus wird auf $x$ angewendet, nicht auf ein Zwischenergebnis. $f$ ist ein Produkt aus $x$ und $\\ln x$.": "The logarithm is applied to $x$, not to an intermediate result. $f$ is a product of $x$ and $\\ln x$.",
  "Zwischen $x$ und $\\ln x$ steht ein Malpunkt.": "There is a multiplication dot between $x$ and $\\ln x$.",
  "$x = x^1$, die Potenzregel liefert $1 \\cdot x^0 = 1$.": "$x = x^1$; the power rule gives $1 \\cdot x^0 = 1$.",
  "$x$ ist keine Konstante; die Gerade $y = x$ hat die Steigung 1.": "$x$ is not a constant; the straight line $y = x$ has slope 1.",
  "Die Ableitung des natürlichen Logarithmus ist $\\frac{1}{x}$.": "The derivative of the natural logarithm is $\\frac{1}{x}$.",
  "Ihre eigene Ableitung ist die Exponentialfunktion $e^x$; für $\\ln x$ gilt $(\\ln x)' = \\frac{1}{x}$.": "The exponential function $e^x$ is its own derivative; for $\\ln x$ we have $(\\ln x)' = \\frac{1}{x}$.",
  "Wie setzt die Produktregel die Bausteine zusammen?": "How does the product rule combine the building blocks?",
  "Ein Produkt wird nicht faktorweise abgeleitet. Die Produktregel lautet $u' \\cdot v + u \\cdot v'$.": "A product is not differentiated factor by factor. The product rule is $u' \\cdot v + u \\cdot v'$.",
  "In der Produktregel steht ein Plus: $u' \\cdot v + u \\cdot v'$.": "The product rule has a plus sign: $u' \\cdot v + u \\cdot v'$.",
  "$x \\cdot \\frac{1}{x} = 1$: Das $x$ kürzt sich.": "$x \\cdot \\frac{1}{x} = 1$: the $x$ cancels.",
  "$x \\cdot \\frac{1}{x} = 1$, nicht 0.": "$x \\cdot \\frac{1}{x} = 1$, not 0.",
  "Die Malpunkte stehen nur innerhalb der Summanden ($5 \\cdot \\ln x$, $2 \\cdot e^x$). Insgesamt besteht $f$ aus drei Summanden.": "The multiplication dots appear only inside the terms ($5 \\cdot \\ln x$, $2 \\cdot e^x$). Overall, $f$ consists of three terms.",
  "Es wird kein Zwischenergebnis in eine andere Funktion eingesetzt.": "No intermediate result is substituted into another function.",
  "Der Faktor 5 bleibt stehen: $5 \\cdot \\frac{1}{x}$.": "The factor 5 remains: $5 \\cdot \\frac{1}{x}$.",
  "Die Ableitung von $\\ln x$ ist $\\frac{1}{x}$, also $5 \\cdot \\frac{1}{x}$.": "The derivative of $\\ln x$ is $\\frac{1}{x}$, so $5 \\cdot \\frac{1}{x}$.",
  "Die Potenzregel gilt für $x^n$ (Basis $x$). Bei $e^x$ steht $x$ im Exponenten; $e^x$ ist seine eigene Ableitung.": "The power rule applies to $x^n$ (base $x$). In $e^x$, $x$ is in the exponent; $e^x$ is its own derivative.",
  "$e^x$ hat die Ableitung $e^x$, der Faktor $-2$ bleibt stehen.": "$e^x$ has the derivative $e^x$; the factor $-2$ remains.",
  "Multipliziert wird nur $3 \\cdot x$ im Exponenten. Danach wird $e$ hoch dieses Ergebnis berechnet.": "Only $3 \\cdot x$ in the exponent is multiplied. Then $e$ to the power of this result is calculated.",
  "T:Ableitung von $e^x$ direkt": "T:Derivative of $e^x$ directly",
  "Im Exponenten steht $3x$ statt $x$. Zuerst wird $3x$ berechnet, dann $e$ hoch das Ergebnis – das ist eine Verkettung.": "The exponent is $3x$ instead of $x$. First $3x$ is calculated, then $e$ to the power of the result – this is a composition.",
  "\\text{Kettenregel: erst } 3x \\text{, dann } e \\text{ hoch das Ergebnis.}": "\\text{Chain rule: first } 3x \\text{, then } e \\text{ to the power of the result.}",
  "Was sind äußere Funktion $u$ und innere Funktion $v$?": "What are the outer function $u$ and the inner function $v$?",
  "Beim Auswerten wird zuerst $3x$ berechnet, dann $e$ hoch das Ergebnis. Die innere Funktion ist der erste Rechenschritt.": "When evaluating, $3x$ is calculated first, then $e$ to the power of the result. The inner function is the first calculation step.",
  "Im Exponenten steht $3x$, nicht nur $x$. Die innere Funktion ist alles, was in den Exponenten eingesetzt wird.": "The exponent is $3x$, not just $x$. The inner function is everything that is substituted into the exponent.",
  "Die Potenzregel gilt, wenn die Variable in der Basis steht. Bei $e^{v}$ steht sie im Exponenten; $e^{v}$ ist seine eigene Ableitung.": "The power rule applies when the variable is in the base. In $e^{v}$ it is in the exponent; $e^{v}$ is its own derivative.",
  "$\\frac{1}{v}$ ist die Ableitung von $\\ln v$. Die Exponentialfunktion ist ihre eigene Ableitung.": "$\\frac{1}{v}$ is the derivative of $\\ln v$. The exponential function is its own derivative.",
  "$3x$ hängt von $x$ ab; die Steigung ist 3.": "$3x$ depends on $x$; the slope is 3.",
  "Wie setzt die Kettenregel die Bausteine zusammen? (Zunächst mit $v$ geschrieben.)": "How does the chain rule combine the building blocks? (Written with $v$ first.)",
  "Die innere Funktion $3x$ ändert sich dreimal so schnell wie $x$. Ihre Ableitung 3 kommt als Faktor hinzu: äußere Ableitung mal innere Ableitung.": "The inner function $3x$ changes three times as fast as $x$. Its derivative 3 is included as a factor: outer derivative times inner derivative.",
  "Der Faktor 3 steht vor der Potenz, nicht im Exponenten: $e^{v} \\cdot 3 = 3e^{v}$.": "The factor 3 goes in front of the power, not into the exponent: $e^{v} \\cdot 3 = 3e^{v}$.",
  "Der Faktor 3 aus der inneren Ableitung bleibt erhalten.": "The factor 3 from the inner derivative is kept.",
  "f(x) = 4. Wurzel aus x^3": "f(x) = fourth root of x^3",
  "Für Wurzeln gibt es keine eigene Ableitungsregel. Als Potenz geschrieben reicht die Potenzregel.": "There is no separate differentiation rule for roots. Written as a power, the power rule is enough.",
  "In dieser Schreibweise steht keine Potenz $x^n$ da. Erst nach dem Umformen lässt sich die Potenzregel anwenden.": "In this notation there is no power $x^n$. The power rule can only be applied after rewriting.",
  "Der Exponent unter der Wurzel steht oben im Bruch, die kleine Zahl an der Wurzel unten: $\\sqrt[n]{x^m} = x^{\\frac{m}{n}}$.": "The exponent under the root goes to the top of the fraction, the small number on the root to the bottom: $\\sqrt[n]{x^m} = x^{\\frac{m}{n}}$.",
  "Ein Minus im Exponenten entsteht nur bei einem Bruch mit $x$ im Nenner. Hier gilt $\\sqrt[4]{x^3} = x^{\\frac{3}{4}}$.": "A minus sign in the exponent only arises from a fraction with $x$ in the denominator. Here $\\sqrt[4]{x^3} = x^{\\frac{3}{4}}$.",
  "$x^{\\frac{3}{4}}$ ist eine Potenz von $x$ selbst; es wird nichts eingesetzt.": "$x^{\\frac{3}{4}}$ is a power of $x$ itself; nothing is substituted.",
  "Der Bruch steht im Exponenten; geteilt wird nicht.": "The fraction is in the exponent; nothing is divided.",
  "\\text{Potenzregel mit Exponent } \\tfrac{3}{4}": "\\text{Power rule with exponent } \\tfrac{3}{4}",
  "$\\frac{3}{4} - 1 = \\frac{3}{4} - \\frac{4}{4} = -\\frac{1}{4}$ – das Vorzeichen ist negativ.": "$\\frac{3}{4} - 1 = \\frac{3}{4} - \\frac{4}{4} = -\\frac{1}{4}$ – the sign is negative.",
  "$e^x$ wird durch $x$ geteilt – das ist ein Quotient.": "$e^x$ is divided by $x$ – this is a quotient.",
  "Es wird nichts in eine andere Funktion eingesetzt; $e^x$ wird durch $x$ geteilt.": "Nothing is substituted into another function; $e^x$ is divided by $x$.",
  "\\text{Quotientenregel}": "\\text{Quotient rule}",
  "Welche Bausteine $u$ (Zähler) und $v$ (Nenner) hat der Quotient?": "Which building blocks $u$ (numerator) and $v$ (denominator) does the quotient have?",
  "In der Quotientenregel steht $u$ im Zähler und $v$ im Nenner.": "In the quotient rule, $u$ is the numerator and $v$ the denominator.",
  "Das wäre die Sicht als Produkt $e^x \\cdot \\frac{1}{x}$. Für die Quotientenregel ist $v$ der Nenner $x$.": "That would be viewing it as the product $e^x \\cdot \\frac{1}{x}$. For the quotient rule, $v$ is the denominator $x$.",
  "Die Potenzregel gilt für $x^n$. Bei $e^x$ steht $x$ im Exponenten; $e^x$ ist seine eigene Ableitung.": "The power rule applies to $x^n$. In $e^x$, $x$ is in the exponent; $e^x$ is its own derivative.",
  "$e^x$ ist seine eigene Ableitung.": "$e^x$ is its own derivative.",
  "Die Gerade $y = x$ hat die Steigung 1.": "The straight line $y = x$ has slope 1.",
  "Aus einer Differenz darf man nicht einzelne Summanden kürzen – das $x$ steht nur im ersten Summanden.": "You must not cancel individual terms of a difference – the $x$ appears only in the first term.",
  "Das Minus aus der Quotientenregel bleibt: $e^x \\cdot 1 = e^x$ wird abgezogen.": "The minus sign from the quotient rule remains: $e^x \\cdot 1 = e^x$ is subtracted.",
  "Beide Wege sind richtig. Mit der Kettenregel erhält man $f'(x) = 6(3x - 1)$ – ausmultipliziert ebenfalls $18x - 6$. Bei höheren Potenzen wie $(3x - 1)^{10}$ ist die Kettenregel deutlich kürzer.": "Both routes are correct. With the chain rule you get $f'(x) = 6(3x - 1)$ – multiplied out also $18x - 6$. For higher powers such as $(3x - 1)^{10}$, the chain rule is much shorter.",
  "Die Basis ist $3x - 1$, nicht $x$. Die Potenzregel allein berücksichtigt nicht, dass sich $3x - 1$ dreimal so schnell ändert wie $x$.": "The base is $3x - 1$, not $x$. The power rule alone does not take into account that $3x - 1$ changes three times as fast as $x$.",
  "\\text{Kettenregel: erst } 3x - 1 \\text{, dann quadrieren.}": "\\text{Chain rule: first } 3x - 1 \\text{, then square.}",
  "Beim Auswerten wird zuerst $3x - 1$ berechnet und das Ergebnis dann quadriert. Die innere Funktion ist der erste Rechenschritt.": "When evaluating, $3x - 1$ is calculated first and the result is then squared. The inner function is the first calculation step.",
  "$(3x)' = 3$, die Konstante $-1$ fällt weg.": "$(3x)' = 3$; the constant $-1$ vanishes.",
  "Die innere Funktion $3x - 1$ ändert sich dreimal so schnell wie $x$. Ihre Ableitung 3 kommt als Faktor hinzu.": "The inner function $3x - 1$ changes three times as fast as $x$. Its derivative 3 is included as a factor.",
  "Die 3 ist ein Faktor, kein Exponent: $2v \\cdot 3 = 6v$.": "The 3 is a factor, not an exponent: $2v \\cdot 3 = 6v$.",
  "Die eingesetzte innere Funktion steht in Klammern: $6 \\cdot (3x - 1)$.": "The substituted inner function goes in brackets: $6 \\cdot (3x - 1)$.",
  "Binomische Formel: $(a - b)^2 = a^2 - 2ab + b^2$; der mittlere Term $-6x$ fehlt.": "Binomial formula: $(a - b)^2 = a^2 - 2ab + b^2$; the middle term $-6x$ is missing.",
  "Quadriert wird die ganze Klammer, also auch die 3: $(3x)^2 = 9x^2$; außerdem fehlt der Term $-6x$.": "The whole bracket is squared, including the 3: $(3x)^2 = 9x^2$; in addition, the term $-6x$ is missing.",
  "Die additive Konstante 1 fällt beim Ableiten weg.": "The additive constant 1 vanishes when differentiating.",
  "Die Potenzregel brauchen wir für $4x^3$. $f$ ist aber ein Produkt aus zwei Funktionen von $x$: $4x^3$ und $e^x$.": "We need the power rule for $4x^3$. But $f$ is a product of two functions of $x$: $4x^3$ and $e^x$.",
  "Es wird nichts in eine andere Funktion eingesetzt; $e^x$ hat nur $x$ im Exponenten.": "Nothing is substituted into another function; $e^x$ has only $x$ in the exponent.",
  "Bei $e^x$ steht $x$ im Exponenten; die Potenzregel gilt hier nicht. $e^x$ ist seine eigene Ableitung.": "In $e^x$, $x$ is in the exponent; the power rule does not apply here. $e^x$ is its own derivative.",
  "$e^x$ ist keine Konstante; die Steigung ist überall gleich dem Funktionswert $e^x$.": "$e^x$ is not a constant; the slope everywhere equals the function value $e^x$.",
  "f(x) = Wurzel(2x + 5)": "f(x) = sqrt(2x + 5)",
  "Die Summe $2x + 5$ steht unter der Wurzel und wird zuerst berechnet; danach wird die Wurzel gezogen.": "The sum $2x + 5$ is under the root and is calculated first; then the root is taken.",
  "Mit $\\sqrt{2x + 5} = (2x + 5)^{\\frac{1}{2}}$ ist das eine Potenz – aber von $2x + 5$, nicht von $x$. Deshalb braucht es zusätzlich die innere Ableitung.": "With $\\sqrt{2x + 5} = (2x + 5)^{\\frac{1}{2}}$ this is a power – but of $2x + 5$, not of $x$. That is why the inner derivative is also needed.",
  "\\text{Kettenregel: erst } 2x + 5 \\text{, dann die Wurzel.}": "\\text{Chain rule: first } 2x + 5 \\text{, then the root.}",
  "Die 5 steht unter der Wurzel: Zuerst wird $2x + 5$ berechnet, dann die Wurzel gezogen.": "The 5 is under the root: first $2x + 5$ is calculated, then the root is taken.",
  "Beim Auswerten wird zuerst $2x + 5$ berechnet, dann die Wurzel gezogen. Die innere Funktion ist der erste Rechenschritt.": "When evaluating, $2x + 5$ is calculated first, then the root is taken. The inner function is the first calculation step.",
  "Wie lautet die äußere Ableitung $u'(v)$ von $\\sqrt{v} = v^{\\frac{1}{2}}$?": "What is the outer derivative $u'(v)$ of $\\sqrt{v} = v^{\\frac{1}{2}}$?",
  "Der Exponent $\\frac{1}{2}$ kommt als Faktor nach vorn, nicht sein Kehrwert.": "The exponent $\\frac{1}{2}$ moves to the front as a factor, not its reciprocal.",
  "$2x + 5$ hängt von $x$ ab; nur die Konstante 5 fällt weg.": "$2x + 5$ depends on $x$; only the constant 5 vanishes.",
  "Die innere Funktion $2x + 5$ ändert sich doppelt so schnell wie $x$. Ihre Ableitung 2 kommt als Faktor hinzu.": "The inner function $2x + 5$ changes twice as fast as $x$. Its derivative 2 is included as a factor.",
  "Der Faktor 2 wird multipliziert, nicht geteilt: $\\frac{1}{2} \\cdot 2 = 1$.": "The factor 2 is multiplied, not divided: $\\frac{1}{2} \\cdot 2 = 1$.",
  "Der Exponent $-\\frac{1}{2}$ bleibt; nur die Zahlfaktoren werden verrechnet.": "The exponent $-\\frac{1}{2}$ stays; only the numerical factors are combined.",
  "Die eingesetzte innere Funktion steht in Klammern: $(2x + 5)^{-\\frac{1}{2}}$.": "The substituted inner function goes in brackets: $(2x + 5)^{-\\frac{1}{2}}$.",
  "f(x) = (x + a)(x − a), a konstant": "f(x) = (x + a)(x − a), a constant",
  "a \\text{ ist eine feste Zahl.}": "a \\text{ is a fixed number.}",
  "Beide Wege sind richtig. Mit $x^2 - a^2$ geht es ohne Produktregel: $f'(x) = 2x$.": "Both routes are correct. With $x^2 - a^2$ you do not need the product rule: $f'(x) = 2x$.",
  "Die Summen stehen in den Klammern; die beiden Klammern werden multipliziert.": "The sums are inside the brackets; the two brackets are multiplied.",
  "Es wird nichts in eine andere Funktion eingesetzt.": "Nothing is substituted into another function.",
  "Dritte binomische Formel: $(x + a)(x - a) = x^2 - a^2$.": "Third binomial formula: $(x + a)(x - a) = x^2 - a^2$.",
  "Das ist $(x - a)^2$. Bei $(x + a)(x - a)$ heben sich die gemischten Terme auf: $x^2 - a^2$.": "That is $(x - a)^2$. In $(x + a)(x - a)$ the mixed terms cancel: $x^2 - a^2$.",
  "Wie lautet die Ableitung von $x^2 - a^2$? ($a$ ist eine feste Zahl.)": "What is the derivative of $x^2 - a^2$? ($a$ is a fixed number.)",
  "$a$ ist eine feste Zahl. $a^2$ ist eine additive Konstante und fällt weg.": "$a$ is a fixed number. $a^2$ is an additive constant and vanishes.",
  "$a^2$ ist eine Konstante; eine additive Konstante fällt beim Ableiten weg.": "$a^2$ is a constant; an additive constant vanishes when differentiating.",
  "$a$ ist eine feste Zahl; als additive Konstante fällt sie weg.": "$a$ is a fixed number; as an additive constant it vanishes.",
  "$(x)' = 1$, und $a$ fällt als Konstante weg.": "$(x)' = 1$, and $a$ vanishes as a constant.",
  "Ein Produkt wird nicht faktorweise abgeleitet: $u' \\cdot v + u \\cdot v'$.": "A product is not differentiated factor by factor: $u' \\cdot v + u \\cdot v'$.",
  "In der Produktregel steht ein Plus.": "The product rule has a plus sign.",
  "Das Plus aus der Produktregel bleibt.": "The plus sign from the product rule remains.",
  "Die beiden Teile der Produktregel werden addiert, nicht multipliziert.": "The two parts of the product rule are added, not multiplied.",
  "$x^3$ wird durch $\\ln x$ geteilt – das ist ein Quotient.": "$x^3$ is divided by $\\ln x$ – this is a quotient.",
  "Der Logarithmus wird auf $x$ angewendet, nicht auf ein Zwischenergebnis. $f$ ist ein Bruch aus $x^3$ und $\\ln x$.": "The logarithm is applied to $x$, not to an intermediate result. $f$ is a fraction of $x^3$ and $\\ln x$.",
  "Aus einer Differenz darf man nicht einzelne Summanden kürzen. Gekürzt wird nur $x^3 \\cdot \\frac{1}{x} = x^2$.": "You must not cancel individual terms of a difference. Only $x^3 \\cdot \\frac{1}{x} = x^2$ is cancelled.",
  "$x^3 \\cdot \\frac{1}{x} = x^2$ – durch $x$ teilen verringert den Exponenten.": "$x^3 \\cdot \\frac{1}{x} = x^2$ – dividing by $x$ lowers the exponent.",
  "1200 ist eine feste Zahl, keine Funktion von $p$. Ein konstanter Faktor bleibt beim Ableiten einfach stehen.": "1200 is a fixed number, not a function of $p$. A constant factor simply remains when differentiating.",
  "Im Exponenten steht $-0{,}05p$ statt $p$. Zuerst wird $-0{,}05p$ berechnet, dann $e$ hoch das Ergebnis – das ist eine Verkettung.": "The exponent is $-0{,}05p$ instead of $p$. First $-0{,}05p$ is calculated, then $e$ to the power of the result – this is a composition.",
  "\\text{Kettenregel: erst } -0{,}05p \\text{, dann } 1200 \\cdot e \\text{ hoch das Ergebnis.}": "\\text{Chain rule: first } -0{,}05p \\text{, then } 1200 \\cdot e \\text{ to the power of the result.}",
  "Was sind äußere Funktion $u$ und innere Funktion $v$? (Der konstante Faktor 1200 gehört zur äußeren Funktion.)": "What are the outer function $u$ and the inner function $v$? (The constant factor 1200 belongs to the outer function.)",
  "Im Exponenten steht $-0{,}05p$; der ganze Exponent ist die innere Funktion.": "The exponent is $-0{,}05p$; the whole exponent is the inner function.",
  "Beim Auswerten wird zuerst $-0{,}05p$ berechnet, dann $1200 \\cdot e$ hoch das Ergebnis.": "When evaluating, $-0{,}05p$ is calculated first, then $1200 \\cdot e$ to the power of the result.",
  "Bei $e^{v}$ steht die Variable im Exponenten; $e^{v}$ ist seine eigene Ableitung. Der Faktor 1200 bleibt stehen.": "In $e^{v}$ the variable is in the exponent; $e^{v}$ is its own derivative. The factor 1200 remains.",
  "Der konstante Faktor 1200 bleibt beim Ableiten stehen.": "The constant factor 1200 remains when differentiating.",
  "Das Vorzeichen bleibt: $(-0{,}05p)' = -0{,}05$.": "The sign stays: $(-0{,}05p)' = -0{,}05$.",
  "Die innere Ableitung $-0{,}05$ ist ein Faktor vor $e$, nicht Teil des Exponenten: $1200 \\cdot (-0{,}05) = -60$.": "The inner derivative $-0{,}05$ is a factor in front of $e$, not part of the exponent: $1200 \\cdot (-0{,}05) = -60$.",
  "Die Verkettung steckt im zweiten Faktor $e^{-x}$. Insgesamt ist $f$ ein Produkt aus $x^2$ und $e^{-x}$.": "The composition is in the second factor $e^{-x}$. Overall, $f$ is a product of $x^2$ and $e^{-x}$.",
  "Zwischen $x^2$ und $e^{-x}$ steht ein Malpunkt.": "There is a multiplication dot between $x^2$ and $e^{-x}$.",
  "Für $v'(x)$: $v(x) = e^{-x}$ ist selbst verkettet. Was ist die innere Funktion von $e^{-x}$?": "For $v'(x)$: $v(x) = e^{-x}$ is itself a composition. What is the inner function of $e^{-x}$?",
  "Im Exponenten steht $-x$, nicht $x$. Die innere Funktion ist der ganze Exponent.": "The exponent is $-x$, not $x$. The inner function is the whole exponent.",
  "Beim Auswerten wird zuerst $-x$ berechnet, dann $e$ hoch das Ergebnis. $-x$ ist die innere Funktion.": "When evaluating, $-x$ is calculated first, then $e$ to the power of the result. $-x$ is the inner function.",
  "\\text{Für } \\V{v(x) = e^{-x}}\\text{: Kettenregel mit innerer Funktion } -x": "\\text{For } \\V{v(x) = e^{-x}}\\text{: chain rule with inner function } -x",
  "Wie lautet $v'(x)$ für $v(x) = e^{-x}$? (Äußere Ableitung mal innere Ableitung.)": "What is $v'(x)$ for $v(x) = e^{-x}$? (Outer derivative times inner derivative.)",
  "Die innere Funktion $-x$ hat die Ableitung $-1$; sie kommt als Faktor hinzu.": "The inner function $-x$ has the derivative $-1$; it is included as a factor.",
  "Die Potenzregel gilt nicht für die $e$-Funktion: Sie ist ihre eigene Ableitung, dazu kommt die innere Ableitung $-1$.": "The power rule does not apply to the $e$-function: it is its own derivative, plus the inner derivative $-1$.",
  "In der Produktregel steht ein Plus; das Minus kommt aus der inneren Ableitung $-1$.": "The product rule has a plus sign; the minus sign comes from the inner derivative $-1$.",
  "Welche Form erhält man, wenn man die Zahlen (hier: Vorzeichen) ausrechnet?": "Which form do you get when you work out the numbers (here: signs)?",
  "$x^2 \\cdot e^{-x} \\cdot (-1) = -x^2 e^{-x}$: Das Vorzeichen wechselt.": "$x^2 \\cdot e^{-x} \\cdot (-1) = -x^2 e^{-x}$: the sign changes.",
  "$e^{-x}$ lässt sich ausklammern, aber nicht weglassen.": "$e^{-x}$ can be factored out, but not dropped.",
  "K_T(r) = K_0 · (1 + r)^T, K_0 und T konstant": "K_T(r) = K_0 · (1 + r)^T, K_0 and T constant",
  "K_0 \\text{ und } T \\text{ sind feste Zahlen.}": "K_0 \\text{ and } T \\text{ are fixed numbers.}",
  "Was ist der beste erste Schritt? ($K_0$ und $T$ sind feste Zahlen.)": "What is the best first step? ($K_0$ and $T$ are fixed numbers.)",
  "$K_0$ ist eine feste Zahl, keine Funktion von $r$. Ein konstanter Faktor bleibt beim Ableiten einfach stehen.": "$K_0$ is a fixed number, not a function of $r$. A constant factor simply remains when differentiating.",
  "Die Basis ist $1 + r$, nicht $r$. Formal ist das eine Verkettung. Weil $(1 + r)' = 1$ ist, führt die Potenzregel hier zwar zum selben Ergebnis – bei z. B. $(1 + 2r)^T$ aber nicht mehr. Wählen Sie die Regel, die immer passt.": "The base is $1 + r$, not $r$. Formally this is a composition. Because $(1 + r)' = 1$, the power rule happens to give the same result here – but not for e.g. $(1 + 2r)^T$. Choose the rule that always works.",
  "\\text{Kettenregel: erst } 1 + r \\text{, dann hoch } T \\text{ und mal } K_0.": "\\text{Chain rule: first } 1 + r \\text{, then to the power of } T \\text{ and times } K_0.",
  "Was sind äußere Funktion $u$ und innere Funktion $v$? (Der konstante Faktor $K_0$ gehört zur äußeren Funktion.)": "What are the outer function $u$ and the inner function $v$? (The constant factor $K_0$ belongs to the outer function.)",
  "$T$ ist der Exponent, die Klammer die Basis: $u(v) = K_0 \\cdot v^T$.": "$T$ is the exponent, the bracket is the base: $u(v) = K_0 \\cdot v^T$.",
  "Der konstante Faktor $K_0$ bleibt beim Ableiten stehen.": "The constant factor $K_0$ remains when differentiating.",
  "Die Konstante 1 fällt weg, $(r)' = 1$.": "The constant 1 vanishes; $(r)' = 1$.",
  "Der Exponent der äußeren Ableitung ist $T - 1$.": "The exponent of the outer derivative is $T - 1$.",
  "$K_0$ ist ein konstanter Faktor; er bleibt beim Ableiten stehen.": "$K_0$ is a constant factor; it remains when differentiating.",
  "Der Exponent bleibt $T - 1$; nur der Faktor 1 entfällt.": "The exponent stays $T - 1$; only the factor 1 is dropped.",
  "Beide Wege sind richtig. Über $2(x^2 + 1)^{-1}$ und die Kettenregel erhält man $f'(x) = -4x\\,(x^2 + 1)^{-2}$ – dasselbe wie $-\\frac{4x}{(x^2 + 1)^2}$.": "Both routes are correct. Via $2(x^2 + 1)^{-1}$ and the chain rule you get $f'(x) = -4x\\,(x^2 + 1)^{-2}$ – the same as $-\\frac{4x}{(x^2 + 1)^2}$.",
  "Im Nenner steht $x^2 + 1$, nicht nur eine Potenz von $x$. Die Potenzregel allein passt hier nicht.": "The denominator is $x^2 + 1$, not just a power of $x$. The power rule alone does not fit here.",
  "Im Zähler steht nur die Zahl 2; $f$ ist ein Bruch, kein Produkt zweier Funktionen.": "The numerator is just the number 2; $f$ is a fraction, not a product of two functions.",
  "Ein Nenner aus mehreren Summanden lässt sich nicht summandenweise umschreiben. Die ganze Klammer wird zu $(x^2 + 1)^{-1}$.": "A denominator consisting of several terms cannot be rewritten term by term. The whole bracket becomes $(x^2 + 1)^{-1}$.",
  "Aus dem Nenner wird ein negativer Exponent: $\\frac{1}{x^2 + 1} = (x^2 + 1)^{-1}$.": "The denominator turns into a negative exponent: $\\frac{1}{x^2 + 1} = (x^2 + 1)^{-1}$.",
  "Die Basis ist $x^2 + 1$, nicht $x$. Zuerst wird $x^2 + 1$ berechnet, dann hoch $-1$ – das ist eine Verkettung.": "The base is $x^2 + 1$, not $x$. First $x^2 + 1$ is calculated, then raised to the power $-1$ – this is a composition.",
  "\\text{Kettenregel: erst } x^2 + 1 \\text{, dann hoch } -1 \\text{ und mal } 2.": "\\text{Chain rule: first } x^2 + 1 \\text{, then to the power of } -1 \\text{ and times } 2.",
  "Was sind äußere Funktion $u$ und innere Funktion $v$? (Der konstante Faktor 2 gehört zur äußeren Funktion.)": "What are the outer function $u$ and the inner function $v$? (The constant factor 2 belongs to the outer function.)",
  "Beim Auswerten wird zuerst $x^2 + 1$ berechnet, dann hoch $-1$ genommen.": "When evaluating, $x^2 + 1$ is calculated first, then raised to the power $-1$.",
  "Die Konstante 1 fällt beim Ableiten weg.": "The constant 1 vanishes when differentiating.",
  "$(x^2)' = 2x$, die Konstante 1 fällt weg.": "$(x^2)' = 2x$; the constant 1 vanishes.",
  "Der Exponent der äußeren Ableitung bleibt $-2$.": "The exponent of the outer derivative stays $-2$.",
  "Im Zähler steht $0 - 4x = -4x$.": "The numerator is $0 - 4x = -4x$.",
  "Der Nenner bleibt $(x^2 + 1)^2$; aus einer Summe lässt sich nichts kürzen.": "The denominator stays $(x^2 + 1)^2$; nothing can be cancelled from a sum.",
  "Der Bruch steht im Logarithmus; außen steht $\\ln$, nicht ein Bruch.": "The fraction is inside the logarithm; the outermost operation is $\\ln$, not a fraction.",
  "Direkt ginge es mit Ketten- und Quotientenregel – deutlich länger. Mit den Logarithmusregeln wird daraus eine Differenz einfacher Terme.": "Directly it would work with the chain and quotient rules – but much longer. With the logarithm rules it becomes a difference of simple terms.",
  "Der Logarithmus eines Quotienten ist die Differenz der Logarithmen: $\\ln\\frac{a}{b} = \\ln a - \\ln b$.": "The logarithm of a quotient is the difference of the logarithms: $\\ln\\frac{a}{b} = \\ln a - \\ln b$.",
  "Der Nenner wird abgezogen: $\\ln\\frac{a}{b} = \\ln a - \\ln b$.": "The denominator is subtracted: $\\ln\\frac{a}{b} = \\ln a - \\ln b$.",
  "Die Verkettung steckt im ersten Summanden. Insgesamt ist das eine Differenz zweier Summanden.": "The composition is in the first term. Overall, this is a difference of two terms.",
  "Der Faktor 4 gehört nur zum zweiten Summanden; insgesamt wird subtrahiert.": "The factor 4 belongs only to the second term; overall, it is a subtraction.",
  "$\\ln(1 + t^2)$ ist verkettet. Was sind äußere Funktion $u$ und innere Funktion $v$?": "$\\ln(1 + t^2)$ is a composition. What are the outer function $u$ and the inner function $v$?",
  "Beim Auswerten wird zuerst $1 + t^2$ berechnet, dann der Logarithmus angewendet.": "When evaluating, $1 + t^2$ is calculated first, then the logarithm is applied.",
  "Im Logarithmus steht $1 + t^2$; die ganze Klammer ist die innere Funktion.": "Inside the logarithm is $1 + t^2$; the whole bracket is the inner function.",
  "\\text{Für } \\ln(1 + t^2)\\text{: } \\U{u(v) = \\ln v}, \\ \\V{v(t) = 1 + t^2}": "\\text{For } \\ln(1 + t^2)\\text{: } \\U{u(v) = \\ln v}, \\ \\V{v(t) = 1 + t^2}",
  "Die Ableitung von $\\ln v$ ist $\\frac{1}{v}$.": "The derivative of $\\ln v$ is $\\frac{1}{v}$.",
  "Wie setzt die Kettenregel die Bausteine für $\\ln(1 + t^2)$ zusammen? (Zunächst mit $v$ geschrieben.)": "How does the chain rule combine the building blocks for $\\ln(1 + t^2)$? (Written with $v$ first.)",
  "Der Faktor $-4$ bleibt mit seinem Vorzeichen stehen.": "The factor $-4$ remains with its sign.",
  "Die Ableitung von $\\ln t$ ist $\\frac{1}{t}$.": "The derivative of $\\ln t$ is $\\frac{1}{t}$.",
  "Welche Form erhält man für $f'(t)$, wenn man die Zahlen ausrechnet?": "Which form do you get for $f'(t)$ when you work out the numbers?",
  "Aus einer Summe im Nenner lässt sich $t$ nicht kürzen.": "$t$ cannot be cancelled from a sum in the denominator.",
  "Die Differenz bleibt: $-4 \\cdot \\frac{1}{t} = -\\frac{4}{t}$.": "The difference remains: $-4 \\cdot \\frac{1}{t} = -\\frac{4}{t}$.",
  "Die Summe $x^2 + 3x$ steht im Exponenten und wird zuerst berechnet; danach wird $e$ hoch das Ergebnis genommen.": "The sum $x^2 + 3x$ is in the exponent and is calculated first; then $e$ is raised to the power of the result.",
  "Im Exponenten steht $x^2 + 3x$ statt $x$. Zuerst wird $x^2 + 3x$ berechnet, dann $e$ hoch das Ergebnis – das ist eine Verkettung.": "The exponent is $x^2 + 3x$ instead of $x$. First $x^2 + 3x$ is calculated, then $e$ to the power of the result – this is a composition.",
  "Hier wird nichts multipliziert. Zuerst wird $x^2 + 3x$ berechnet, das Ergebnis steht dann im Exponenten von $e$.": "Nothing is multiplied here. First $x^2 + 3x$ is calculated; the result then becomes the exponent of $e$.",
  "\\text{Kettenregel: erst } x^2 + 3x \\text{, dann } e \\text{ hoch das Ergebnis.}": "\\text{Chain rule: first } x^2 + 3x \\text{, then } e \\text{ to the power of the result.}",
  "Der ganze Exponent $x^2 + 3x$ ist die innere Funktion.": "The whole exponent $x^2 + 3x$ is the inner function.",
  "Beim Auswerten wird zuerst $x^2 + 3x$ berechnet, dann $e$ hoch das Ergebnis.": "When evaluating, $x^2 + 3x$ is calculated first, then $e$ to the power of the result.",
  "Bei $e^{v}$ steht die Variable im Exponenten; die Potenzregel gilt hier nicht.": "In $e^{v}$ the variable is in the exponent; the power rule does not apply here.",
  "Auch $3x$ wird abgeleitet: $(3x)' = 3$.": "$3x$ is differentiated too: $(3x)' = 3$.",
  "\\text{ausmultipliziert: } f'(x) = \\frac{4x - 8}{(1 + x)^3}": "\\text{multiplied out: } f'(x) = \\frac{4x - 8}{(1 + x)^3}",
  "Die Verkettung steckt im Nenner $(1 + x)^2$. Insgesamt ist $f$ ein Bruch: Zähler durch Nenner.": "The composition is in the denominator $(1 + x)^2$. Overall, $f$ is a fraction: numerator over denominator.",
  "Die Summen stehen in Zähler und Nenner; insgesamt wird geteilt.": "The sums are in the numerator and denominator; overall, it is a division.",
  "Die additive Konstante 3 fällt beim Ableiten weg.": "The additive constant 3 vanishes when differentiating.",
  "Auch $-2x$ wird abgeleitet: $(-2x)' = -2$.": "$-2x$ is differentiated too: $(-2x)' = -2$.",
  "$(1 + x)^2$ ist verkettet: Die Klammer $1 + x$ wird quadriert. Die äußere Ableitung ist $2 \\cdot (1 + x)$ – mit der inneren Funktion, nicht mit ihrer Ableitung 1.": "$(1 + x)^2$ is a composition: the bracket $1 + x$ is squared. The outer derivative is $2 \\cdot (1 + x)$ – with the inner function, not with its derivative 1.",
  "Der Exponent verringert sich um 1: Aus dem Quadrat wird $2 \\cdot (1 + x)^1$.": "The exponent decreases by 1: the square becomes $2 \\cdot (1 + x)^1$.",
  "Gekürzt wird mit $(1 + x)$ in Zähler und Nenner: $(1 + x)^4 \\to (1 + x)^3$.": "Cancel $(1 + x)$ in numerator and denominator: $(1 + x)^4 \\to (1 + x)^3$.",
  "Gekürzt wird in beiden Teilen des Zählers: Auch $(1 + x)^2$ verliert einen Faktor $(1 + x)$.": "Cancel in both parts of the numerator: $(1 + x)^2$ also loses a factor $(1 + x)$.",
  "Die Basis ist $2x^2 - 3$, nicht $x$. Die Potenzregel allein berücksichtigt nicht, wie sich $2x^2 - 3$ mit $x$ ändert.": "The base is $2x^2 - 3$, not $x$. The power rule alone does not take into account how $2x^2 - 3$ changes with $x$.",
  "Die Differenz $2x^2 - 3$ steht in der Klammer und wird zuerst berechnet; danach wird hoch 5 genommen.": "The difference $2x^2 - 3$ is in the bracket and is calculated first; then it is raised to the power 5.",
  "Ausmultiplizieren ginge, wäre bei der fünften Potenz aber sehr aufwendig. Mit einer Ableitungsregel geht es direkt.": "Multiplying out would work, but is very laborious for the fifth power. A differentiation rule gets there directly.",
  "\\text{Kettenregel: erst } 2x^2 - 3 \\text{, dann hoch } 5.": "\\text{Chain rule: first } 2x^2 - 3 \\text{, then to the power of } 5.",
  "Beim Auswerten wird zuerst $2x^2 - 3$ berechnet und das Ergebnis dann hoch 5 genommen. Die innere Funktion ist der erste Rechenschritt.": "When evaluating, $2x^2 - 3$ is calculated first and the result is then raised to the power 5. The inner function is the first calculation step.",
  "Die Konstante $-3$ fällt beim Ableiten weg.": "The constant $-3$ vanishes when differentiating.",
  "Der Faktor 2 bleibt stehen: $(2x^2)' = 2 \\cdot 2x = 4x$.": "The factor 2 remains: $(2x^2)' = 2 \\cdot 2x = 4x$.",
  "Das $x$ aus der inneren Ableitung $4x$ bleibt stehen: $5 \\cdot 4x = 20x$.": "The $x$ from the inner derivative $4x$ remains: $5 \\cdot 4x = 20x$."
};

const TASK_RULES_EN = [
  [/^Was ist für (.+) der beste nächste Schritt\?$/, a => `What is the best next step for ${a}?`],
  [/^Im letzten Schritt wird für \$v\$ wieder die innere Funktion (.+) eingesetzt\. Welches Ergebnis entsteht\?$/,
   a => `In the last step, the inner function ${a} is substituted back for $v$. What is the result?`],
  [/^Für \$v\$ wird die innere Funktion (.+) eingesetzt, nicht ihre Ableitung(.*)\.$/,
   (a, b) => `The inner function ${a} is substituted for $v$, not its derivative${b}.`],
  [/^Für \$v\$ wird die ganze innere Funktion (.+) eingesetzt\.$/, a => `The whole inner function ${a} is substituted for $v$.`],
  [/^Wie lautet \$([uv])'\((\w)\)\$ für \$([uv])\((\w)\) = (.+)\$\?$/,
   (f, x, g, y, e) => `What is $${f}'(${x})$ for $${g}(${y}) = ${e}$?`],
  [/^Wie lautet die Ableitung des Summanden (.+)\?$/, a => `What is the derivative of the term ${a}?`],
  [/^Wie lautet die Ableitung von (.+)\?$/, a => `What is the derivative of ${a}?`],
  [/^Wie lautet die äußere Ableitung \$u'\(v\)\$(?: von (.+))?\?$/,
   a => `What is the outer derivative $u'(v)$${a ? " of " + a : ""}?`],
  [/^Wie lautet die innere Ableitung \$v'\((\w)\)\$\?$/, x => `What is the inner derivative $v'(${x})$?`],
  [/^(.+) ist eine Gerade mit Steigung (.+?)(?:: (.+))?\.$/,
   (a, b, c) => `${a} is a straight line with slope ${b}${c ? ": " + c : ""}.`],
  [/^Der Exponent verringert sich um 1: (.+)\.$/, a => `The exponent decreases by 1: ${a}.`],
  [/^In der Klammer steht (.+); die ganze Klammer ist die innere Funktion\.$/,
   a => `The bracket contains ${a}; the whole bracket is the inner function.`],
  [/^Die innere Ableitung (.+) kommt als Faktor hinzu: äußere Ableitung mal innere Ableitung\.$/,
   a => `The inner derivative ${a} is included as a factor: outer derivative times inner derivative.`],
  [/^In der äußeren Ableitung (.+) bleibt \$v\$ stehen; die innere Ableitung (.*?) ?kommt (?:nur )?als Faktor dazu\.$/,
   (a, b) => `In the outer derivative ${a}, $v$ stays as it is; the inner derivative ${b ? b + " " : ""}is only added as a factor.`],
  [/^Der Exponent (.+) kommt als Faktor nach vorn(?:: (.+))?\.$/,
   (a, b) => `The exponent ${a} moves to the front as a factor${b ? ": " + b : ""}.`],
  [/^Die Faktoren werden multipliziert: (.+)\.$/, a => `The factors are multiplied: ${a}.`],
  [/^Das Vorzeichen: (.+)\.$/, a => `Mind the sign: ${a}.`],
  [/^Im Nenner steht \$v\$ zum Quadrat(?:: (.+))?\.$/, a => `The denominator is $v$ squared${a ? ": " + a : ""}.`],
  [/^Der ganze Nenner (.+) ist \$v\$\.$/, a => `The whole denominator ${a} is $v$.`],
  [/^Der Faktor (\S+) bleibt beim Ableiten stehen(?:: (.+))?\.$/,
   (a, b) => `The factor ${a} remains when differentiating${b ? ": " + b : ""}.`],
  [/^\\text\{Produktregel: \}(.*)$/, a => `\\text{Product rule: }${a}`],
  [/^\\text\{Quotientenregel: \}(.*)$/, a => `\\text{Quotient rule: }${a}`]
];

const TASK_TEXT_MISSING = [];

// German text → English text (null if neither table nor rule applies).
function taskTextEn(s) {
  if (Object.prototype.hasOwnProperty.call(TASK_TEXT_EN, s)) return TASK_TEXT_EN[s];
  for (const [re, fn] of TASK_RULES_EN) {
    const m = s.match(re);
    if (m) return fn(...m.slice(1));
  }
  return null;
}

// Decimal comma → decimal point (TeX "0{,}05" and plain "0,05").
function decimalPoint(s) {
  return typeof s === "string" ? s.replace(/\{,\}/g, ".").replace(/(\d),(\d)/g, "$1.$2") : s;
}

function isTranslatable(s) {
  return typeof s === "string" && /[A-Za-zÄÖÜäöüß]{3,}/.test(s.replace(/\\[a-zA-Z]+/g, "").replace(/\$[^$]*\$/g, ""));
}

function trText(s) {
  if (!isTranslatable(s)) return decimalPoint(s);
  const en = taskTextEn(s);
  if (en === null) { TASK_TEXT_MISSING.push(s); return decimalPoint(s); }
  return decimalPoint(en);
}

function localizeTree(tree) {
  (tree || []).forEach(n => { n.tex = decimalPoint(n.tex); });
}

function localizeStep(s) {
  if (s.q) s.q = trText(s.q);
  (s.opts || []).forEach(o => {
    o[0] = o[0].startsWith("T:") ? trText(o[0]) : decimalPoint(o[0]);
    if (o[2]) o[2] = trText(o[2]);
  });
  if (s.lines) s.lines = s.lines.map(l => (l.includes("\\text") ? trText(l) : decimalPoint(l)));
  const tr = s.tree || {};
  ["done", "relabel"].forEach(k => {
    if (tr[k]) Object.keys(tr[k]).forEach(id => { tr[k][id] = decimalPoint(tr[k][id]); });
  });
}

// Translates TASKS in place (called by app.js when the page language is English).
function localizeTasks(tasks) {
  tasks.forEach(t => {
    t.plain = trText(t.plain);
    t.f = decimalPoint(t.f);
    if (t.note) t.note = trText(t.note);
    if (t.extra) t.extra = t.extra.map(trText);
    if (t.consts) t.consts = decimalPoint(t.consts.replace(" und ", " and "));
    localizeTree(t.tree);
    t.steps.forEach(localizeStep);
    if (t.alt) {
      t.alt.note = trText(t.alt.note);
      localizeTree(t.alt.tree);
      t.alt.steps.forEach(localizeStep);
    }
  });
}
