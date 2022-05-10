/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    let list = document.body;
    for (let i = 0; i < count; i++) {
        list.insertAdjacentHTML('afterbegin', `<${tag}>${content}</${tag}>`);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    function plusOne(count, step) {
        let foundation = document.createElement('div');
        foundation.classList = `item_${step}`;
        if (step < level) {
            for (let i = 0; i < count; i++) {
                foundation.appendChild(plusOne(childrenCount, step + 1));
            }
        }
        return foundation;
    }
    return plusOne(childrenCount, 1);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    function newDiv(step) {
        let currentDiv = document.createElement('div');
        currentDiv.classList = `item_${step}`;
        if (step < 3) {
            for (let i = 1; i <= 2; i++) {
                currentDiv.appendChild(newDiv(step + 1));
            }
        }
        return currentDiv;
    }

    function replacementForTag(element) {
        if (element.className == 'item_2') {
            let section = document.createElement('section');
            section.classList = 'item_2';
            section.innerHTML = element.innerHTML;
            element.replaceWith(section);
        }
    }

    let knot = newDiv(1);
    knot.childNodes.forEach(replacementForTag);
    return knot;
}
