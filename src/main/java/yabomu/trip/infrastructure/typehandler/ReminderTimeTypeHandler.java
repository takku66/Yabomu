package yabomu.trip.infrastructure.typehandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import yabomu.trip.domain.valueobject.ReminderTime;

public class ReminderTimeTypeHandler extends BaseTypeHandler<ReminderTime> {

	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, ReminderTime parameter, JdbcType jdbcType)
			throws SQLException {
		ps.setInt(i, parameter.getCode());
	}

	@Override
	public ReminderTime getNullableResult(ResultSet rs, String columnName) throws SQLException {
		return ReminderTime.selectBy(rs.getInt(columnName));
	}

	@Override
	public ReminderTime getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
		return ReminderTime.selectBy(rs.getInt(columnIndex));
	}

	@Override
	public ReminderTime getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
		return ReminderTime.selectBy(cs.getInt(columnIndex));
	}



}
