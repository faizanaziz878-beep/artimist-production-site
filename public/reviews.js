(function () {
  'use strict';

  var grid = document.getElementById('reviewsGrid');
  var form = document.getElementById('reviewForm');
  var status = document.getElementById('reviewStatus');

  function stars(rating) {
    var full = Math.floor(Number(rating) || 5);
    return '★★★★★'.slice(0, full) + ((Number(rating) % 1) ? '½' : '');
  }

  function reviewCard(review) {
    var article = document.createElement('article');
    var score = document.createElement('div');
    score.className = 'reviews-v2-stars';
    score.setAttribute('aria-label', String(review.rating || 5) + ' out of 5 stars');
    score.textContent = stars(review.rating);

    var quote = document.createElement('blockquote');
    quote.textContent = '“' + String(review.quote || '') + '”';

    var footer = document.createElement('footer');
    var name = document.createElement('strong');
    name.textContent = review.clientName || 'Client';
    var meta = document.createElement('span');
    meta.textContent = [review.role, review.company].filter(Boolean).join(' · ');
    footer.appendChild(name);
    footer.appendChild(meta);

    article.appendChild(score);
    article.appendChild(quote);
    article.appendChild(footer);
    return article;
  }

  if (grid) {
    fetch('/api/testimonials', { headers: { Accept: 'application/json' } })
      .then(function (response) { return response.ok ? response.json() : Promise.reject(new Error('reviews unavailable')); })
      .then(function (data) {
        if (!data || !Array.isArray(data.testimonials) || !data.testimonials.length) return;
        grid.textContent = '';
        data.testimonials.slice(0, 3).forEach(function (review) { grid.appendChild(reviewCard(review)); });
      })
      .catch(function () { /* Keep the published fallback feedback in the HTML. */ });
  }

  if (form && status) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      var submit = form.querySelector('button[type="submit"]');
      submit.disabled = true;
      submit.textContent = 'SENDING…';
      status.textContent = '';

      fetch('/api/testimonials', { method: 'POST', body: new FormData(form) })
        .then(function (response) {
          return response.json().catch(function () { return {}; }).then(function (data) {
            if (!response.ok) throw new Error(data.error || 'Could not send the review.');
            return data;
          });
        })
        .then(function () {
          form.reset();
          status.textContent = 'Thank you. Your review is now with the studio for approval.';
        })
        .catch(function (error) {
          status.textContent = error.message || 'Could not send the review. Please try again.';
        })
        .finally(function () {
          submit.disabled = false;
          submit.textContent = 'SEND FOR ADMIN REVIEW ↗';
        });
    });
  }
}());
