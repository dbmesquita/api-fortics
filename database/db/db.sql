USE fortics;
CREATE TABLE tickets (
    codcli integer not null, 
    cgc  text not null,
    duplic integer not null, 
    nfe integer not null,
    dtemissao date not null, 
    dtvenc date not null, 
    valor doubleprecision not null, 
    linhadigitavel text , 
    numparc integer not null, 
    numcar integer not null,
    dtpag date, 
    dtcancel date, 
    linhadigformat text
);
SET character_set_client = utf8;
SET character_set_connection = utf8;
SET character_set_results = utf8;
SET collation_connection = utf8_general_ci;

