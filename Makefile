NODEJS 		= node
RUN			= ./run.sh

default: test

# TODO allow us to use this file to actually compile!

test:
	@echo "=================================================="
	@echo "Running tests. Successful tests produce no output."
	@echo "=================================================="
	@TMPDIR="`mktemp -d`"; \
	if [[ "$$VERSION" == "" ]]; then \
		VERSION="`ls versions/ | sort | head -n 1`"; \
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
