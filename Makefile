NODEJS 		= node
RUN			= ./run.sh

default: build

dev: build_dev

build: src/*.vzp src/corefuncs.js
	@if [[ "$$USING_VERSION" == "" ]]; then \
		USING_VERSION="`ls versions/ | sort -V | tail -n 1`"; \
	fi; \
	TMP_STAGING_DIR="`mktemp -d`"; \
	for f in src/*.vzp; do \
		f_nodir="$${f##*/}"; \
		$(RUN) "$$USING_VERSION" compile "$$f" > "$$TMP_STAGING_DIR/$${f_nodir/.vzp/.js}"; \
	done; \
	mkdir -p versions/00-testing/staging; \
	npx webpack -o versions/00-testing/staging/vzp.js --target=node --mode=production --silent "$$TMP_STAGING_DIR/main.js"; \
	cp src/*.js versions/00-testing/staging/; \
	for f in src/*.vzp; do \
		f_nodir="$${f##*/}"; \
		$(RUN) 00-testing/staging compile "$$f" > "$$TMP_STAGING_DIR/$${f_nodir/.vzp/.js}"; \
	done; \
	npx webpack -o versions/00-testing/vzp.js --target=node --mode=production --silent "$$TMP_STAGING_DIR/main.js"; \
	cp src/*.js versions/00-testing/; \
	$(RM) -rf versions/00-testing/staging \
	$(RM) -rf "$$TMP_STAGING_DIR"

build_dev: src/*.vzp src/corefuncs.js
	@if [[ "$$USING_VERSION" == "" ]]; then \
		USING_VERSION="`ls versions/ | sort -V | tail -n 1`"; \
	fi; \
	TMP_STAGING_DIR="`mktemp -d`"; \
	for f in src/*.vzp; do \
		f_nodir="$${f##*/}"; \
		$(RUN) "$$USING_VERSION" compile "$$f" > "$$TMP_STAGING_DIR/$${f_nodir/.vzp/.js}"; \
	done; \
	mkdir -p versions/00-testing/staging; \
	npx webpack -o versions/00-testing/staging/vzp.js --target=node --mode=development --silent "$$TMP_STAGING_DIR/main.js"; \
	cp src/*.js versions/00-testing/staging/; \
	for f in src/*.vzp; do \
		f_nodir="$${f##*/}"; \
		$(RUN) 00-testing/staging compile "$$f" > "$$TMP_STAGING_DIR/$${f_nodir/.vzp/.js}"; \
	done; \
	npx webpack -o versions/00-testing/vzp.js --target=node --mode=development --silent "$$TMP_STAGING_DIR/main.js"; \
	cp src/*.js versions/00-testing/; \
	$(RM) -rf versions/00-testing/staging \
	$(RM) -rf "$$TMP_STAGING_DIR"

test: build
	@echo "=================================================="
	@echo "Running tests. Successful tests produce no output."
	@echo "=================================================="
	@TMPDIR="`mktemp -d`"; \
	for dir in tests/*; do \
		for f in $$dir/*.vzp; do \
			$(RUN) 00-testing compile "$$f" > "$${f/.vzp/.js}"; \
		done; \
		$(NODEJS) "$$dir/program.js" > "$$TMPDIR/stdout" 2> "$$TMPDIR/stderr"; \
		diff "$$dir/stdout" "$$TMPDIR/stdout"; \
		if [[ "$$?" == "1" ]]; then echo "$$dir/stdout failed"; fi; \
		diff "$$dir/stderr" "$$TMPDIR/stderr"; \
		if [[ "$$?" == "1" ]]; then echo "$$dir/stderr failed"; fi; \
	done; \
	$(RM) -f tests/*/*.js \
	$(RM) -f tests/write/written.txt \
	$(RM) -rf "$$TMPDIR"

clean:
	$(RM) -rf versions/00-testing
