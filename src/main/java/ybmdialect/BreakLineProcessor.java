package ybmdialect;

import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.engine.AttributeName;
import org.thymeleaf.model.IModel;
import org.thymeleaf.model.IModelFactory;
import org.thymeleaf.model.IProcessableElementTag;
import org.thymeleaf.model.ITemplateEvent;
import org.thymeleaf.processor.element.IElementTagStructureHandler;
import org.thymeleaf.standard.processor.AbstractStandardExpressionAttributeTagProcessor;
import org.thymeleaf.templatemode.TemplateMode;

/**
 * <pre>{@literal
 * データ内の改行コードを、<br>タグに置き換える。
 * \r\n, \r, \n の各コードが対象となる。
 * e.g.
 * 	<ybm:brtext="Hello\r\nWorld"> →Hello<br>World
 * }
 * </pre>
 * @version 1.0
 */
public class BreakLineProcessor extends AbstractStandardExpressionAttributeTagProcessor {
	private static final String ATTR_NAME = "brtext";

	public BreakLineProcessor(String dialectPrefix, int precedence) {
		super(TemplateMode.HTML, dialectPrefix, ATTR_NAME, precedence, true);
	}


	@Override
	protected void doProcess(ITemplateContext context, IProcessableElementTag tag, AttributeName attributeName,
							String attributeValue, Object expressionResult, IElementTagStructureHandler structureHandler) {
		// nullの場合は何も出力せず処理を終了
		if (expressionResult == null) return;

		IModelFactory factory = context.getModelFactory();
		IModel model = factory.createModel();

		ITemplateEvent brTag = factory.createOpenElementTag("br");

		// 改行コードで分割
		String[] lines = expressionResult.toString().split("\r\n|\r|\n", -1);
		for (String line : lines) {
			// <br>+1行分の文字列をmodelに追加
			model.add(brTag);
			model.add(factory.createText(line));
        }
		// 先頭の<br>タグを除去
		model.remove(0);

		structureHandler.setBody(model, false);
	}
}
