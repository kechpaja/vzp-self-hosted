NODEJS 		= node
RUN			= ./run.sh

default: dev

dev: staging
	@if [[ "$$USING_VERSION" == "" ]]; then \
		USING_VERSION="`ls versions/ | sort -V | tail -n 1`"; \
	fi; \
	$(RUN) "$$USING_VERSION" src/main > versions/00-testing/vzp.js; \
	cp src/*.js versions/00-testing/;

# TODO stuff that could go in a prod recipe
#TMP_STAGING_DIR="`mktemp -d`"; \
#npx webpack -o versions/00-testing/staging/vzp.js --target=node --mode=production --silent "$$TMP_STAGING_DIR/main.js"; \
#$(RM) -rf versions/00-testing/staging \
#$(RM) -rf "$$TMP_STAGING_DIR"


staging: src/*.vzp src/corefuncs.js
	@if [[ "$$USING_VERSION" == "" ]]; then \
		USING_VERSION="`ls versions/ | sort -V | tail -n 1`"; \
	fi; \
	mkdir -p versions/00-testing/staging; \
	$(RUN) "$$USING_VERSION" src/main > versions/00-testing/staging/vzp.js; \
	cp src/*.js versions/00-testing/staging/;

test: 
	@echo "=================================================="
	@echo "Running tests. Successful tests produce no output."
	@echo "=================================================="
	@TMPDIR="`mktemp -d`"; \
	for dir in tests/*; do \
		$(RUN) 00-testing "$$dir/program" > "$$dir/program.js"; \
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
