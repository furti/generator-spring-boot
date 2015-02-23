package <%= basePackage %>.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


public final class DateUtils
{

    private DateUtils()
    {

    }

    /**
     * Parses a iso date.
     *
     * @param dateAsString - String
     * @return LocalDate
     */
    public static LocalDate parseISO(String dateAsString)
    {
        if (dateAsString == null || dateAsString.trim().length() == 0)
        {
            return null;
        }

        return LocalDate.parse(dateAsString, findFormatter(dateAsString));
    }

    /**
     * Parses a iso date.
     *
     * @param dateAsString - String
     * @return LocalDate
     */
    public static LocalDateTime parseISODateTime(String dateAsString)
    {
        if (dateAsString == null || dateAsString.trim().length() == 0)
        {
            return null;
        }

        return LocalDateTime.parse(dateAsString, findFormatter(dateAsString));
    }

    /**
     * format a iso date.
     *
     * @param date - the date to format
     * @return Formatted date
     */
    public static String formatISO(LocalDate date)
    {
        if (date == null)
        {
            return null;
        }

        return formatISO(date.atStartOfDay());
    }

    /**
     * format a iso date and time.
     *
     * @param dateTime - the date and time to format
     * @return Formatted date
     */
    public static String formatISO(LocalDateTime dateTime)
    {
        if (dateTime == null)
        {
            return null;
        }

        return dateTime.format(DateTimeFormatter.ISO_DATE_TIME) + "Z";
    }

    private static DateTimeFormatter findFormatter(String dateAsString)
    {
        if (dateAsString.contains("T"))
        {
            return DateTimeFormatter.ISO_DATE_TIME;
        }
        else
        {
            return DateTimeFormatter.ISO_DATE;
        }
    }
}
