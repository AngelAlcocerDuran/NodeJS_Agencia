
const url = 'http://localhost:4000'

const findAll = async() => {
    await $.ajax({
        type: 'GET',
        url: url + '/marca'
    }).done(res => {
        let table = $('#table');
        let listMarcas = res.listMarcas;

        table.append(
            "<tr class='bg-dark text-white'>"+
              "<th scope='col'>Id</th>"+
              "<th scope='col'>Nombre</th>"+
              "<th scope='col'>Editar</th>"+
              "<th scope='col'>Eliminar</th>"+
            "</tr>"
        )

        for(let i = 0; i < listMarcas.length; i++){ 

            table.append(
                "<tr class='text-dark'>"+
                  "<td>"+ listMarcas[i].id +"</td>"+
                  "<td>"+ listMarcas[i].nombre +"</ttd>"+
                  "<td><button class='btn btn-warning' data-target='#update' data-toggle='modal' onclick='getInfoUpdate("+ listMarcas[i].id +")'><i class='fas fa-edit'></i></button></td>"+
                  "<td><button class='btn btn-danger' data-target='#remove' data-toggle='modal' onclick='idForRemove("+ listMarcas[i].id +")'><i class='fas fa-trash'></i></button></td>"+
                "</tr>"
            )
        }
    });
}

findAll();

const getById = async(id) => {
    return await $.ajax({
        type: 'GET',
        url: url + '/marca/' + id
    }).done(res => res);
};

const getInfoUpdate = async(id) => {
    let marca = await getById(id);
    document.getElementById('u_id'). value = id;
    document.getElementById('u_name').value = marca.marca[0].nombre;
};

const create = async() => {
    let nombre = document.getElementById('c_name').value;

    await $.ajax({
        type:'POST',
        url: url + '/marca/create',
        data: { nombre }
    }).done(res => {
        console.log(res);
    });
};

const update = async() => {
    let id = document.getElementById('u_id'). value;
    let nombre = document.getElementById('u_name').value;

    await $.ajax({
        type: 'POST',
        url: url + '/marca/update/' +id,
        data: { nombre }
    }).done(res => {
        console.log(res);
    });
};

const idForRemove = async(id) => {
    document.getElementById('r_id').value = id;
}

const remove = async() => {
    let id = document.getElementById('r_id').value;

    await $.ajax({
        type: 'POST',
        url: url + '/marca/remove/' + id
    }).done(res => {
        console.log(res);
    });
};