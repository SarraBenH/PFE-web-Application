package com.pfe.projet.config;

import org.hibernate.dialect.MySQL8Dialect;

public class MySQL8UnicodeDialect extends MySQL8Dialect {

    private static final int MY_SQL_DIALECT_VERSION_MAJOR = 8;

    @Override
    public String getTableTypeString() {
        return " ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci";
    }
}
