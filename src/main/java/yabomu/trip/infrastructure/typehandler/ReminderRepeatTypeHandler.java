package yabomu.trip.infrastructure.typehandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import yabomu.trip.domain.valueobject.ReminderRepeat;

public class ReminderRepeatTypeHandler extends BaseTypeHandler<ReminderRepeat> {

	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, ReminderRepeat parameter, JdbcType jdbcType)
			throws SQLException {
		 ps.setString(i, parameter.getCode());
	}

	@Override
	public ReminderRepeat getNullableResult(ResultSet rs, String columnName) throws SQLException {
		return ReminderRepeat.selectBy(rs.getString(columnName));
	}

	@Override
	public ReminderRepeat getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
		return ReminderRepeat.selectBy(rs.getString(columnIndex));
	}

	@Override
	public ReminderRepeat getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
		return ReminderRepeat.selectBy(cs.getString(columnIndex));
	}



}
