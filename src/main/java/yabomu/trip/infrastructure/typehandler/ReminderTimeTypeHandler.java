package yabomu.trip.infrastructure.typehandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import yabomu.trip.domain.valueobject.ReminderNoticeTime;

public class ReminderTimeTypeHandler extends BaseTypeHandler<ReminderNoticeTime> {

	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, ReminderNoticeTime parameter, JdbcType jdbcType)
			throws SQLException {
		ps.setInt(i, parameter.getCode());
	}

	@Override
	public ReminderNoticeTime getNullableResult(ResultSet rs, String columnName) throws SQLException {
		return ReminderNoticeTime.selectBy(rs.getInt(columnName));
	}

	@Override
	public ReminderNoticeTime getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
		return ReminderNoticeTime.selectBy(rs.getInt(columnIndex));
	}

	@Override
	public ReminderNoticeTime getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
		return ReminderNoticeTime.selectBy(cs.getInt(columnIndex));
	}



}
