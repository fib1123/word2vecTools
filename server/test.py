#-*- coding: utf-8 -*-

from random import randint

def transform(name, surname):
    posName = randint(1, len(name) - 1)
    posSurname = randint(1, len(surname) - 1)

    preName, sufName = name[:posName], name[posName:]
    preSurname, sufSurname = surname[:posSurname], surname[posSurname:]

    return preName + sufSurname, preSurname + sufName

people = ["Bujas Jakub","Chrząstek Zuzanna","Galas Filip","Grochal Bartłomiej","Kudzia Jakub","Pater Wojciech","Podsiadło Krzysztof","Sawa Sara","Suder Dawid","Szecówka Jakub","Wilgierz Wojciech","Wójcik Piotr","Zajma Hubert","Drewniak Aleksandra","Górka Marcin","Imiełowski Maciej","Kmiecik Mateusz","Makówka Maciej","Maniecki Paweł","Morawiec Mikołaj","Niemirski Paweł","Pomorski Hubert","Węgrzyński Krzysztof","Winkowska Paulina","Wolny Michał","Adaszyński Wojciech","Jurasz Wiktor","Kurc Przemysław","Leśniak Albert","Myjak Marek","Obrok Beata","Pachołek Rafał","Papciak Krzysztof","Pikulska Nina","Solawa Jakub",
          "Warchoł Maciej","Zaręba Marcin","Białas Paweł","Domagalska Renata","Furdyna Michał","Gębusia Patryk","Janusz Jakub","Klocek Konrad","Machowski Tymoteusz","Ociepka Piotr","Sepielak Damian","Śmiałko Michał","Tryliński Dawid",
          "Wrona Patrycja","Bugno Kamil","Dąbroś Maciej","Dymek Wojciech","Kuś Damian","Marzec Konrad","Niechciał Roksana","Petruk Dmytro","Sieniawski Mikołaj","Skalski Patryk","Szady Adam","Zagrajczuk Wojciech","Zezyk Michał",
          "Bielec Agnieszka","Grabis Wojciech","Kałuski Wojciech","Królikowski Zbigniew","Lach Paulina","Majcher Mateusz","Myśliwiec Rafał","Nawara Krzysztof","Siatka Grzegorz","Skalski Marcin","Szaszkiewicz Adam","Szlósarczyk Izabella","Barański Jakub","Dworak Dawid","Gieleciak Michał",
          "Ławski Patryk","Majewski Marcin","Owczarek Mateusz","Pedrycz Piotr","Radwański Wojciech","Stępak Jakub","Wolak Paweł","Wójcik Anna","Zieliński Marcin", "Bałazy Klaudia","Bochenek Piotr","Bubula Beata","Gajewski Łukasz","Gurdek Łukasz","Habryn Konrad","Halska Katarzyna","Heilman Piotr","Jarosz Mateusz","Kazała Maciej","Konior Patryk","Seget Szymon","Zajda Marcin","Ciechanowski Dariusz","Gaweł Mateusz","Głąb Katarzyna","Komenda Kamil","Kościński Adam","Kotlarczyk Justyna","Krzemień Piotr","Kudyba Łukasz","Łaganowski Grzegorz","Medygrał Bartłomiej","Socha Arkadiusz","Synowiec Jakub","Szczepańska Anna","Bańkowska Aleksandra","Ćwik Paweł",
          "Fudała Michał","Kantor Mateusz","Kasprzyk Tomasz","Kijak Joanna","Kruczek Piotr","Martyna Piotr","Poparda Robert","Robak Stanisław","Szymborski Michał","Zając Hubert",
          "Ciepiela Aleksander","Dudzik Michał","Kleemann Weronika","Łągiewka Szymon","Ogiela Daniel","Petka Łukasz","Salawa Małgorzata","Stawicki Piotr","Strojewska Agata","Warchał Alicja","Wojtaszek Michał","Ziąber Marcin",
          "Borkowski Tomasz","Chmiela Stanisław","Dąbrowa Jędrzej","Grabiański Rafał","Grzywacz Mikołaj","Gul Aleksander","Jarmocik Łukasz","Kopytko Krzysztof","Obłaza Jacek","Pachuta Wojciech","Śnieżek Olaf","Wąchała Piotr",
          "Bukowski Ludwik","Konieczna Katarzyna","Krok Michał","Marczewska Ewa","Płaczkiewicz Leszek","Roksela Piotr","Sendera Marcin","Tarsa Michał","Tracz Szymon","Wawrzyk Łukasz","Wojtkowski Szymon","Żak Paulina","Żelazko Rafał"]

people2 = ["Anioł Anna","Baczyński Wojciech","Banach Paweł","Baran Beata","Baran Michał","Biel Michał","Bielas Robert","Błaszków Bartosz","Bogdał Grzegorz","Borkowski Grzegorz","Borzęcki Michał","Budziak Michał",
            "Bukowski Bartłomiej","Burkat Krzysztof","Byczyńska Aleksandra","Byra Joanna","Bytnar Anna","Chmura Krystian","Cieślik Kamil","Cynarski Łukasz","Cynk Karolina","Czopek Artur","Ćwiertnia Michał","Dański Dawid",
            "Dubikowski Jacek","Duda Patryk","Dudek Rafał","Dziok Maria","Dzióbek Michał","Faber Kamil","Front Mateusz","Gacek Aleksandra","Gąsiorowska Katarzyna","Gil Arkadiusz","Gontarz Aleksandra","Gorazda Jan","Góralczyk Dominik",
            "Górska Gabriela","Górski Jan","Grabiec Piotr","Grabowski Michał","Grzeszczuk Rafał","Guzik Tomasz","Hamuda Michał","Haracz Sebastian","Hendzel Dominik","Jagieła Dawid","Jamrozowicz Przemysław","Jarzębak Gerard",
            "Jatkowski Piotr","Jaworski Piotr","Jura Dominik","Kalawski Przemysław","Karpiel Wojciech","Kasznia Mateusz","Kawałek Michał","Kisielewski Adam","Knapczyk Piotr","Kocot Maciej","Kolonko Anna","Kopeć Mateusz","Kopeć Tomasz",
            "Kosowski Michał","Kozak Karol","Kozyra Wojciech","Kruczyński Krzysztof","Kurp Kamil","Kuźniar Marek","Lampart Łukasz","Lasoń Marcin","Leśniak Albert","Lompart Patryk","Loza Boguslav","Maciejko Kamil","Maciejowski Piotr",
            "Maj Andrzej","Makselon Jakub","Marczak Maciej","Marczak Mateusz","Matuszek Maria","Michalczewski Michał","Morawski Tomasz","Mrukot Patryk","Mucha Sławomir","Mura Karolina","Nowak Mateusz","Nowak Paweł","Olszewska Małgorzata",
            "Onieszczuk Konrad","Pająk Łukasz","Palimąka Paweł","Pawula Albert","Pęcak Maciej","Piechota Tomasz","Piechowicz Andrzej","Piekarz Jakub","Piotrowski Adam","Pisarek Andrzej","Plewnia Łukasz","Pluta Michał","Polnik Wojciech",
            "Powroźnik Marek","Proniewicz Patryk","Przybylski Bartosz","Przybyło Piotr","Pustelnik Sebastian","Puszkarski Piotr","Radzio Marcin","Rapacz Maciej","Rząsa Piotr","Sadowski Michał","Samól Julia","Sasko Mateusz","Sendorek Joanna",
            "Sikora Michał","Sikora Ryszard","Skała Wiktor","Skrabacz Mariusz","Skwara Bartosz","Sładek Patryk","Słota Olga","Smutek Damian","Sosnowski Damian","Stachoń Magdalena","Stanisz Kacper","Stobiecki Jacek","Strzałka Łukasz",
            "Suder Dawid","Sukiennik Szymon","Sumper Bartosz","Suruło Krzysztof","Szafran Bartosz","Szałach Bartłomiej","Szmit Bartosz","Szopiński Paweł","Średnicki Mateusz","Tatuśko Michał","Tokarski Stanisław","Trybała Damian",
            "Tułowiecki Jan","Tustanowski Jakub","Uchwat Maria","Walkowicz Bartosz","Wandzel Paweł","Wilk Jakub","Wilk Przemysław","Windak Mateusz","Wis Krzysztof","Wrona Krzysztof","Zagórski Michał","Zając Arkadiusz","Zgliński Michał",
            "Zielińska Joanna","Barnach Marzena"]

people3 = ["Lech Adamus", "Witold Alda", "Tomasz Arodź", "Paweł Armatys", "Bartosz Baliś", "Bogusław Bednarek", "Sławomir Bieniasz", "Tomasz Bołd", "Andrzej Bolewski", "Krzysztof Boroń", "Krzysztof Boryczko",
 "Robert Brzoza-Woch", "Marian Bubak", "Aleksander Byrski", "Krzysztof Cetnarowicz", "Sylwia Cichacz", "Wilhelm Czapliński", "Wojciech Czech", "Łukasz Czekierda", "Bogdan Ćmiel", "Przemysław Dadel", "Jacek Dajda",
  "Władysław Roman Dąbrowski", "Monika Dekster", "Roman Dębski", "Jacek Długopolski", "Grzegorz Dobrowolski", "Krzysztof Dorosz", "Rafał Dreżewski", "Tadeusz Dyduch", "Mateusz Dyndał", "Barbara Dziurdzia", "Witold Dzwinel",
   "Szymon Engel", "Łukasz Faber", "Piotr Faliszewski", "Artur Fortuna", "Wojciech Frącz", "Wacław Frydrych", "Włodzimierz Funika", "Bogusław Filipowicz", "Marek Gajęcki", "Zbigniew Galias", "Bogdan Gliwa", "Paweł Gładki",
    "Rafał Głowacz", "Barbara Głut", "Ryszard Golański", "Łukasz Gondek", "Zbigniew Gorczyca", "Remigiusz Górecki", "Joanna Grabska-Chrząstowska", "Leszek Grzanka", "Arkadiusz Janik", "Marcin Jarząb", "Alina Jasek",
     "Jadwiga Jegier", "Łukasz Jęda", "Konrad Jopek", "Tomasz Jurczyk", "Zbigniew Kaleta", "Zbigniew Kąkol", "Marek Kisiel-Dorohinicki", "Jacek Kitowski", "Jerzy Konarski", "Marek Konieczny",
      "Wojciech Korczyński", "Michał Korzycki", "Joanna Kosińska", "Jacek Kosiński", "Jarosław Koźlak", "Jerzy Kral", "Roman Krasowski", "Wojciech Kraszewski", "Dariusz Król", "Tomasz Kułaga", "Krzysztof Kułakowski",
       "Marcin Kurdziel", "Marcin Kuta", "Bartosz Kwolek", "Bogdan Kwolek", "Wiesław Lubaszewski", "Adam Łuszpaj", "Marek Macura", "Krzysztof Magiera", "Zbigniew Magoński", "Piotr Majerski", "Janusz Majewski", "Filip Malawski",
        "Maciej Malawski", "Robert Marcjan", "Antoni Marczyk", "Wojciech Matyjewicz", "Wojciech Maziarz", "Mariusz Meszka", "Janusz Molis", "Piotr Nawrocki", "Janina Niedoba", "Michał Niedźwiecki", "Mateusz Nikodem",
         "Darin Nikolow", "Konrad Nosek", "Michał Andrzej Nowak", "Ryszard Nowakowski", "Marek Ogiela", "Ewa Olejarz-Mieszaniec", "Beata Orchel", "Marcin Orchel", "Beata Ostachowicz", "Jerzy Ostachowicz", "Ewa Paszkowska",
          "Maciej Paszyński", "Paweł Petecki", "Paweł Pietras", "Kamil Piętak", "Piotr Pisarek", "Stanisław Polak", "Jakub Przybyło", "Paweł Przybyłowicz", "Marek Psiuk", "Lucjan Pytlik", "Dominik Radziszowski",
           "Witold Rakoczy", "Janusz Rosiek", "Katarzyna Rycerz", "Robert Schaefer", "Magdalena Sękowska", "Marcin Sieniek", "Leszek Siwik", "Kornel Skałkowski", "Marcin Skotniczny", "Mikołaj Skowron", "Renata Słota",
            "Maciej Smołka", "Mariusz Sokołowski", "Tomasz Sośnicki", "Paweł Suliński", "Jacek Szybowski", "Tomasz Szydło", "Tomasz Szumlak", "Filip Szura", "Jakub Szyduczyński", "Artur Szymański", "Tomasz Świderski",
             "Paweł Topa", "Wojciech Turek", "Magdalena Tyniec", "Marek Valenta", "Anna Wach-Michalik", "Agnieszka Wantuch", "Anna Wasieczko-Zając", "Anna Wasiewicz-Porębska", "Rafał Wcisło", "Danuta Węglowska",
              "Marzena Wohadło", "Adam Wojda", "Krzysztof Worytkiewicz", "Jan Woźniak", "Maciej Woźniak", "Michał Wrzeszcz", "Przemysław Wyszkowski", "Wojciech Zaborowski", "Ryszard Zalecki", "Piotr Zegarmistrz",
               "Agnieszka Zielińska", "Krzysztof Zieliński", "Sławomir Zieliński", "Damian Zięba", "Anna Zygmunt", "Małgorzata Żabińska-Rakoczy", "Andrzej Żak", "Piotr Żuraniewski", "Daniel Żmuda"]

people = map(lambda x: x.decode('utf8'), people)

people = map(lambda x: transform(x.split(" ")[0], x.split(" ")[1]), people)
# people = map(lambda x: ''.join(x), people)

print people

for p in people:
	print p[1], p[0]