'use strict';

$(document).ready(function () {
	$("input[type='password'][data-eye]").each(function (index) {
		const $this = $(this);
		const wrapperId = `eye-password-${index}`;
		
		// Wrap input in a container
		$this.wrap($('<div/>', {
			style: 'position:relative',
			id: wrapperId,
		}));

		// Style input padding for the toggle button
		$this.css({ paddingRight: '60px' });

		// Add toggle button
		const toggleButton = $('<div/>', {
			html: 'Show',
			class: 'btn btn-primary btn-sm',
			id: `passeye-toggle-${index}`,
		}).css({
			position: 'absolute',
			right: '10px',
			top: `${$this.outerHeight() / 2 - 12}px`,
			padding: '2px 7px',
			fontSize: '12px',
			cursor: 'pointer',
		});

		$this.after(toggleButton);

		// Add hidden input for plain text value tracking
		const hiddenInput = $('<input/>', {
			type: 'hidden',
			id: `passeye-${index}`,
		});
		$this.after(hiddenInput);

		// Clone invalid-feedback if it exists
		const invalidFeedback = $this.closest('.form-group').find('.invalid-feedback');
		if (invalidFeedback.length) {
			$this.after(invalidFeedback.clone());
		}

		// Sync hidden input value with password field
		$this.on('keyup paste', function () {
			$(`#passeye-${index}`).val($this.val());
		});

		// Toggle password visibility
		$(`#passeye-toggle-${index}`).on('click', function () {
			if ($this.hasClass('show')) {
				$this.attr('type', 'password');
				$this.removeClass('show');
				$(this).removeClass('btn-outline-primary').html('Show');
			} else {
				$this.attr('type', 'text');
				$this.val($(`#passeye-${index}`).val());
				$this.addClass('show');
				$(this).addClass('btn-outline-primary').html('Hide');
			}
		});
	});

	// Form validation
	$('.my-login-validation').submit(function (event) {
		const form = $(this);
		if (!form[0].checkValidity()) {
			event.preventDefault();
			event.stopPropagation();
		}
		form.addClass('was-validated');
	});
});
