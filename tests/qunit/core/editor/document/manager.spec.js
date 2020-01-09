import ElementsHelper from './elements/helper.js';

jQuery( () => {
	QUnit.module( 'File: editor/document/manager', () => {
		QUnit.test( 'History per document', ( assert ) => {
			const documentIdMaster = 2,
				documentIdSlave = 3;

			// Add fake documents.
			const documentMaster = elementor.documents.addDocumentById( documentIdMaster, elementor.getPreviewContainer() ),
				documentSlave = elementor.documents.addDocumentById( documentIdSlave, elementor.getPreviewContainer() );

			// Set current document to master.
			elementor.documents.setCurrent( documentMaster );

			// Create button and save it under master document.
			const eButton = ElementsHelper.createAutoButton();

			// Validate the button was saved to history of master document.
			assert.equal( elementor.documents.getCurrent().history.getItems().length, 3,
				'Master document have "3" items in history.' );

			// Set current document to slave.
			elementor.documents.setCurrent( documentSlave );

			// Validate document does not have History.
			assert.equal( elementor.documents.getCurrent().history.getItems().length, 0,
				'Slave document does not have items in history.' );

			// Do change under slave document.
			ElementsHelper.settings( eButton, {
				text: 'Some other value',
			} );

			const done = assert.async(); // Pause the test till done.

			setTimeout( () => {
				// Validate history of slave document was affected.
				assert.equal( elementor.documents.getCurrent().history.getItems().length, 2,
					'Slave document have "2" items in history.' );

				// Ensure history under slave document have button settings changed.
				assert.equal( elementor.documents.getCurrent().history.getItems().at( 0 ).attributes.type, 'change',
					'Slave document was affected and there is "change" type in it.' );

				// Set current document to master.
				elementor.documents.setCurrent( documentMaster );

				// Ensure master still have only initial history.
				assert.equal( elementor.documents.getCurrent().history.getItems().length, 3,
					'Master document still have "3" items in history.' );

				done();
			} );
		} );
	} );
} );