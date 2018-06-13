function Column(id, name) {
	var self = this;

	this.id = id;
	var columnID = id;
	this.name = name || 'No name given';
	this.$element = createColumn();


	function createColumn() {
		// CREATING COMPONENTS OF COLUMNS
		var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnCardList = $('<ul>').addClass('column-card-list').attr('id', columnID);
		var $columnDelete = $('<button>').addClass('btn-delete').append('<i class="fa fa-trash-o" aria-hidden="true"></i>');
		var $columnAddCard = $('<button>').addClass('add-card').text('+');

		// ADDING EVENTS
		$columnDelete.click(function () {
			self.removeColumn();
		});
		// Add a note after clicking on the button:
		$columnAddCard.click(function(event) {

			var cardName = prompt("Enter the name of the card");
			if (cardName) {
				$.ajax({
					url: baseUrl + '/card',
					method: 'POST',
					data: {
						name: cardName,
						bootcamp_kanban_column_id: id
					},
					success: function(response) {
						var card = new Card(response.id, cardName, columnID);
						self.addCard(card);
					}
				});
			} else if (cardName === "") {
				alert('Please fill your card');
			}
		});

		// CONSTRUCTION COLUMN ELEMENT
		$column.append($columnDelete)
						.append($columnTitle)
						.append($columnAddCard)
						.append($columnCardList);

		// RETURN OF CREATED COLUMN
		return $column;
	}
}

Column.prototype = {
	addCard: function(card) {
		this.$element.children('ul').append(card.$element);
	},
	removeColumn: function () {
		var self = this;
		$.ajax({
			url: baseUrl + '/column/' + self.id,
			method: 'DELETE',
			success: function (response){
				self.$element.remove();
			}
		});
	}
};
