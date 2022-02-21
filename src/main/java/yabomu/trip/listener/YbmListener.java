package yabomu.trip.listener;

import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class YbmListener implements ServletRequestListener {
    private static final Logger logger = (Logger) LoggerFactory.getLogger(YbmListener.class);

    @Override
    public void requestInitialized(ServletRequestEvent sre) {
        logger.debug("requestInitialized : {}", sre);
    }

    @Override
    public void requestDestroyed(ServletRequestEvent sre) {
        logger.debug("requestDestroyed : {}", sre);
    }
}
