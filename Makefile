NODEJS 		= node
RUN			= ./run.sh

default: build

build: src/*.vzp src/corefuncs.js
	@if [[ "$$USING_VERSION" == "" ]]; then \
		USING_VERSION="`ls versions/ | sort -V | tail -n 1`"; \
	fi; \
	mkdir -p versions/00-testing/staging; \
	for f in src/*.vzp; do \
		f_nodir="$${f##*/}"; \
		$(RUN) "$$USING_VERSION" compile "$$f" > "versions/00-testing/staging/$${f_nodir/.vzp/.js}"; \
	done; \
	cp src/*.js versions/00-testing/staging/; \
	for f in src/*.vzp; do \
		f_nodir="$${f##*/}"; \
		$(RUN)  00-testing/staging compile "$$f" > "versions/00-testing/$${f_nodir/.vzp/.js}"; \
	done; \
	cp src/*.js versions/00-testing/; \
	$(RM) -rf versions/00-testing/staging

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
	$(RM) -f tests/write/written.txt

clean:
	$(RM) -rf versions/00-testing
