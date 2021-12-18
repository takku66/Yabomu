package ybmdialect;

import java.util.HashSet;
import java.util.Set;

import org.thymeleaf.dialect.AbstractProcessorDialect;
import org.thymeleaf.processor.IProcessor;
import org.thymeleaf.standard.StandardDialect;

/**
 * <pre>
 * yabomuアプリ内のDialect
 * </pre>
 * @version 1.0
 * @see BreakLineProcessor
 */
public class YbmDialect extends AbstractProcessorDialect {
	private static final String NAME = "yabomu original dialect";
	private static final String PREFIX = "ybm";

	public YbmDialect() {
		super(NAME, PREFIX, StandardDialect.PROCESSOR_PRECEDENCE);
	}

	@Override
	public Set<IProcessor> getProcessors(String dialectPrefix) {
		Set<IProcessor> processors = new HashSet<>();

		processors.add(new BreakLineProcessor(dialectPrefix, getDialectProcessorPrecedence()));

		return processors;
	}
}
