/*
	Скрипт для рисования сетки направляющих в фотошопе
*/
(function () {
	if (app.documents.length === 0) return;

	var thisColRightGuide;
	var nextColLeftGuide;
	var document = app.activeDocument;
	var i;
	var guides = [];
	var filteredParams = [];
	var params = prompt('Количество колонок, [межколонник], [поля]', '12 24 32');

	params = params.split(/[^0-9]/);

	for (i = 0; i < params.length; i++) {
		if (params[i]) {
			filteredParams.push(parseInt(params[i]));
		}
	}

	var cols = filteredParams[0] || 1;
	var gutter = filteredParams[1] || 0;
	var margin = filteredParams[2] || 0;

	var docWidth = parseInt(document.width.value);
	var gridWidth = docWidth - margin * 2;
	var colWidth = Math.floor((gridWidth - gutter * (cols - 1)) / cols);

	if (margin) {
		guides.push(margin);
		guides.push(docWidth - margin);
	}

	for (i = 1; i < cols; i++) {
		nextColLeftGuide = margin + (colWidth + gutter) * i;
		guides.push(nextColLeftGuide);
		if (gutter) {
			thisColRightGuide = nextColLeftGuide - gutter;
			guides.push(thisColRightGuide);
		}
	}

	for (i = 0; i < guides.length; i++) {
		document.guides.add(Direction.VERTICAL, guides[i]);
	}
})();