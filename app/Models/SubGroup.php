<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubGroup extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'group_id'];

    public function group()
    {
        return $this->belongsTo(Group::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
