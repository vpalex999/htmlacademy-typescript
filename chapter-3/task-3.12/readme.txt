Реализуйте две публичные функции: getControl и init.
Они позволят вам и вашим коллегам более гибко работать с типизацией в коде, динамически определяя необходимый тип для элемента.

init
Функция init получает один параметр, значения которого ограничены множеством известных вариантов интерфейса.
Мы ограничимся одним значением — html. 
Но если системы создания компонентов будут работать правильно, вы легко сможете расширить разрешённые значения.

Функция init выполняет необходимые действия и готовит «плацдарм» для работы функции getControl.

getControl
Функция getControl получает строку — одну из разрешённого множества контролов.
Мы продемонстрируем идею на примере трёх контролов:

Button — позволяет создать на форме кнопку;
Customer — позволяет создать на форме сложный UI для поиска и выбора одного конкретного заказчика из списка известных в CRM;
Product — позволяет выбрать из каталога нужный товар.
Заготовка этой библиотеки будет расширяться и дополняться для создания CRM.

Интерфейсы
После обсуждения с коллегами вы зафиксировали интерфейсы для контролов:

i-face-control.ts — все контролы корпоративной библиотеки имеют эти свойства;
i-face-button.ts — описывает дополнительные свойства кнопки;
i-face-customer.ts — описывает дополнительные свойства компонента выбора заказчика;
i-face-product.ts — описывает дополнительные свойства компонента для поиска товара по каталогу.
Реализация разных элементов коллекции
Для задачи вам потребуется механизм, который будет динамически определять тип для получения определённой коллекции.

Сами коллекции уже созданы в директории html:

button.ts,
customer.ts,
product.ts.
Коллекция
Также уже создана коллекция, которая возвращает определённый тип коллекции по одному из приватных атрибутов класса:

import { UiCollection } from "./i-face-collection";
import { Button } from "./i-face-button";
import { CustomerSelect } from "./i-face-customer";
import { ProductSelect } from "./i-face-product";

export class Collection implements UiCollection {
  constructor(
    private buttonCtor: new () => Button,
    private customerCtor: new () => CustomerSelect,
    private productCtor: new () => ProductSelect
  ) {}

  button = () => new this.buttonCtor();
  customer = () => new this.customerCtor();
  product = () => new this.productCtor();
}

      
Результат

Интерфейс для неё:

import { Button } from "./i-face-button";
import { CustomerSelect } from "./i-face-customer";
import { ProductSelect } from "./i-face-product";

export interface UiCollection {
  button: () => Button;
  customer: () => CustomerSelect;
  product: () => ProductSelect;
}
        
      
Результат

У вас должно получиться следующее:

init("html");
// Получаем объект кнопки из коллекции html
const button = getControl("button");
        
      
Вся необходимая типизация уже реализована внутри getControl и init. 
Она определяется динамически с помощью параметра и возвращает один из типов: Button, CustomerSelect или ProductSelect. 
При необходимости коллекция типов может дополняться. 
Достаточно обновить класс Сollection, дополнив его новыми типами, и можно работать с новыми элементами, не используя их интерфейсы для них напрямую.