NODEJS 		= node
RUN			= ./run.sh

default: build

build: src/*.vzp src/corefuncs.js
	@if [[ "$$PREV_VERSION" == "" ]]; then \
		PREV_VERSION="`ls versions/ | sort -V | tail -n 1`"; \
	fi; \
	if [[ "$$VERSION" == "" ]]; then \
		VERSION="00-testing"; \
	fi; \
	mkdir -p versions/$$VERSION/staging; \
	for f in src/*.vzp; do \
		f_nodir="$${f##*/}"; \
		$(RUN) "$$PREV_VERSION" compile "$$f" > "versions/$$VERSION/staging/$${f_nodir/.vzp/.js}"; \
	done; \
	cp src/*.js "versions/$$VERSION/staging/"; \
	for f in src/*.vzp; do \
		f_nodir="$${f##*/}"; \
		$(RUN) "$$VERSION/staging" compile "$$f" > "versions/$$VERSION/$${f_nodir/.vzp/.js}"; \
	done; \
	cp src/*.js "versions/$$VERSION/"; \
	$(RM) -rf "versions/$$VERSION/staging"

test: build
	@echo "=================================================="
	@echo "Running tests. Successful tests produce no output."
	@echo "=================================================="
	@TMPDIR="`mktemp -d`"; \
	if [[ "$$VERSION" == "" ]]; then \
		VERSION="00-testing"; \
	fi; \
	for dir in tests/*; do \
		for f in $$dir/*.vzp; do \
			$(RUN) $$VERSION compile "$$f" > "$${f/.vzp/.js}"; \
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
