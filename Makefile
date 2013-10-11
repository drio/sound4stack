all:
	@echo "make serve"
	@echo "make update-pages"

serve:
	@(git checkout gh-pages; \
	rm -rf /tmp/sound4stack; \
	cp -r ../sound4stack /tmp ; \
	git checkout master ; \
	cd /tmp/sound4stack ; \
	python3 -m http.server 9999 )

update-pages: sound.v0.min.js
	@(cp sound*.js /tmp; \
	git checkout gh-pages; \
	mv /tmp/sound*.js .; \
	git commit -a -m 'Updating from master'; \
	git push origin gh-pages;\
	git checkout master)

sound.v0.min.js: sound.v0.js
	uglifyjs < $< > $@

.PHONY: serve update-pages
