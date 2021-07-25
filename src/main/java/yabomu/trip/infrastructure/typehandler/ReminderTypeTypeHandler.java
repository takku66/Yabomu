package yabomu.trip.infrastructure.typehandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;

import yabomu.trip.domain.valueobject.ReminderType;

public class ReminderTypeTypeHandler extends BaseTypeHandler<ReminderType> {

	@Override
	public void setNonNullParameter(PreparedStatement ps, int i, ReminderType parameter, JdbcType jdbcType)
			throws SQLException {
		ps.setString(i, parameter.getCode());
	}

	@Override
	public ReminderType getNullableResult(ResultSet rs, String columnName) throws SQLException {
		return ReminderType.selectBy(rs.getString(columnName));
	}

	@Override
	public ReminderType getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
		return ReminderType.selectBy(rs.getString(columnIndex));
	}

	@Override
	public ReminderType getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
		return ReminderType.selectBy(cs.getString(columnIndex));
	}



}
